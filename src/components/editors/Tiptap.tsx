'use client';

import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { useMemo } from 'react'

const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World!</p>', 
            immediatelyRender: false,
    })

    
    // Memoize the provider value to avoid unnecessary re-renders
    const providerValue = useMemo(() => ({ editor }), [editor])
    
    if (!editor) { 
        return null // Prevent rendering until the editor is initialized
    }
    
    return (
        <EditorContext.Provider value={providerValue}>
        <EditorContent editor={editor} />
        <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
        </EditorContext.Provider>
    )
}

export default Tiptap