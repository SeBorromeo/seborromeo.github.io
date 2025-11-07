'use client';

import { useEditor, EditorContent, EditorContext, JSONContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { useMemo } from 'react'

const Tiptap = ({ initialContent = {}, onSave }: { initialContent: JSONContent, onSave: (content: JSONContent) => {}}) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: initialContent, 
        immediatelyRender: false,
    })
    
    const providerValue = useMemo(() => ({ editor }), [editor])
    
    if (!editor) { 
        return null 
    }
    
    return (
        <div>
            <EditorContext.Provider value={providerValue}>
                <EditorContent editor={editor} />
                <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
                <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
            </EditorContext.Provider>
            <button onClick={() => onSave(editor.getJSON())}>Save</button>
        </div>
    )
}

export default Tiptap