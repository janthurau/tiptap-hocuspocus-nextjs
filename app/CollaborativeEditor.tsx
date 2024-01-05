"use client";

import {useState, useRef, useEffect} from "react";
import {
  HocuspocusProvider,
  WebSocketStatus,
  HocuspocusProviderWebsocket,
  TiptapCollabProvider, TiptapCollabProviderWebsocket
} from "@hocuspocus/provider";
import EditorComponent from "@/app/Editor";

export default function CollaborativeEditorComponent(props: { documentName: string }) {

  const [status, setStatus] = useState(WebSocketStatus.Disconnected)

  const provider = useRef<TiptapCollabProvider>()
  const providerSocket = useRef<TiptapCollabProviderWebsocket>()

  useEffect(() => {
    if (typeof window !== undefined) {
      providerSocket.current = new TiptapCollabProviderWebsocket({
       appId: 'XY9DJ9E6',
      })

      provider.current = new TiptapCollabProvider({
        websocketProvider: providerSocket.current,
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
