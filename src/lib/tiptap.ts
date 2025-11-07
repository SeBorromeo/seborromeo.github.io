import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import { JSONContent } from '@tiptap/react'

export function jsonToHTML(json: JSONContent) {
  return generateHTML(json, [StarterKit])
}
