"use client";

import {useState, useRef, useEffect} from "react";
import {HocuspocusProvider, WebSocketStatus} from "@hocuspocus/provider";
import EditorComponent from "@/app/Editor";

export default function CollaborativeEditorComponent(props: { documentName: string }) {

  const [status, setStatus] = useState(WebSocketStatus.Disconnected)

  const provider = useRef<HocuspocusProvider>()

  useEffect(() => {
    if (typeof window !== undefined) {
      provider.current = new HocuspocusProvider({
        url: 'ws://127.0.0.1:8080',
        name: props.documentName,
        token: 'YOUR_TEST',
        onStatus(data) {
          setStatus(data.status)
        }
      })
    }
  }, [props.documentName]);

  return (
    <div>
      <p>Status: {status}</p>
      {provider.current && <EditorComponent document={provider.current.document}></EditorComponent>}
    </div>
  )
}
