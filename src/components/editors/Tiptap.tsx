'use client';

import { useEditor, EditorContent, EditorContext, JSONContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { useMemo, useTransition } from 'react'
import { Toolbar, ToolbarGroup } from '../tiptap-ui-primitive/toolbar';
import { BoldIcon } from '../tiptap-icons/bold-icon';
import { ItalicIcon } from '../tiptap-icons/italic-icon';
import { Spacer } from '../tiptap-ui-primitive/spacer';
import { MarkButton } from '../tiptap-ui/mark-button';
import { Button } from '../tiptap-ui-primitive/button';

const Tiptap = ({ initialContent = {}, onSave }: { initialContent: JSONContent, onSave: (content: JSONContent) => {}}) => {
    const [isPending, startTransition] = useTransition();
    
    
    const editor = useEditor({
        extensions: [StarterKit],
        content: initialContent, 
        immediatelyRender: false,
    })
    
    const providerValue = useMemo(() => ({ editor }), [editor])
    
    function handleSave() {
        startTransition(async () => {
            onSave(editor!.getJSON());
        })
    }

    if (!editor) { 
        return null 
    }
    
    return (
        <>
            <EditorContext.Provider value={providerValue}>
                <Toolbar>
                    <ToolbarGroup>
                        <MarkButton 
                            editor={editor}
                            type="bold"
                            text="Bold"
                            hideWhenUnavailable={true}
                            showShortcut={true}
                            aria-label="Toggle bold"
                        >
                            <BoldIcon className="tiptap-button-icon" />
                        </MarkButton>
                        <MarkButton 
                            editor={editor}
                            type="italic"
                            text="Italic"
                            hideWhenUnavailable={true}
                            showShortcut={true}
                            aria-label="Toggle italic"
                        >
                            <ItalicIcon className="tiptap-button-icon" />
                        </MarkButton>
                    </ToolbarGroup>

                    <Spacer />

                    <ToolbarGroup>
                        <Button 
                            data-style="primary"
                            data-disabled={isPending}
                            shortcutKeys="Ctrl+Enter"
                            onClick={handleSave}
                        >
                            {isPending ? "Saving..." : "Save"}
                        </Button>
                    </ToolbarGroup>
                </Toolbar>
                
                <EditorContent editor={editor} />
            </EditorContext.Provider>
        </>
    )
}

export default Tiptap