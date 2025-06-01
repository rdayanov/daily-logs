import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { ReactNode, useEffect, useRef, useState } from 'react'

import instructions from './instructions'

import styles from './styles.module.pcss'

interface MarkdownProps {
  name: string;
  children: ReactNode;
  onChange?: (markdown: string) => void;
  content?: string;
}

export const Markdown = ({ content = instructions, name, onChange, children }: MarkdownProps) => {
  const textbox = useRef<HTMLDivElement | null>(null)
  const editorView = useRef<EditorView | null>(null)
  const [doc, updateDoc] = useState(content)

  useEffect(() => {
    if (textbox.current && !editorView.current) {
      editorView.current = createEditor(textbox.current)
    }

    return () => {
      editorView.current?.destroy()
      editorView.current = null
    }
  }, [])

  useEffect(() => {
    onChange && onChange(doc)
  }, [doc, onChange])

  function createEditor(parent: HTMLDivElement) {
    return new EditorView({
      doc: content,
      parent: parent,
      extensions: [
        basicSetup,
        EditorView.updateListener.of((update) => update.docChanged && updateDoc(update.state.doc.toString())),
        markdown(),
        EditorView.theme({
          '&': {
            fontSize: '14px',
          },
          '.cm-content': {
            padding: '20px',
            minHeight: '460px',
          },
          '.cm-focused': {
            outline: 'none',
          },
          '.cm-editor.cm-focused': {
            outline: 'none',
          },
          '.cm-scroller': { overflow: 'auto' },
        }),
      ],
    })
  }

  return (
    <>
      <label id={ `${ name }-textbox` }>{ children }</label>
      <div className={ styles.textbox }
           role="textbox"
           ref={ el => textbox.current = el }
           aria-labelledby={ `${ name }-textbox` }></div>
      <input type="hidden"
             name={ name }
             value={ doc }/>
    </>

  )
}
