"use client";

import {EditorContent, useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {Collaboration} from "@tiptap/extension-collaboration";
import type * as Y from 'yjs'

export default function EditorComponent(props: { document: Y.Doc }) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: props.document
      })
    ],
  })

  return (
    <div>
      <h1>Editor: </h1>
      <EditorContent editor={editor}></EditorContent>
    </div>
  )
}
