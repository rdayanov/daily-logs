import { ReactNode, useEffect, useRef, useState } from 'react'

import styles from './styles.module.pcss'

interface FieldLabelProps {
  name: string;
  children: ReactNode;
}

export const FieldLabel = ({ name, children }: FieldLabelProps) => {
  const input = useRef<HTMLInputElement | null>(null)
  const label = useRef<HTMLDivElement | null>(null)

  const [isEmpty, setIsEmpty] = useState(false)

  const onInput = () => {
    if (input.current && label.current) {
      input.current.value = label.current.innerText
    }
    setIsEmpty(!label.current?.innerText)
  }

  useEffect(() => {
    if (input.current && label.current) {
      onInput()
    }
  }, [input, label])

  return (
    <>
      <input type="hidden"
             name={ name }
             ref={ (el) => (input.current = el) }/>
      <div contentEditable
           suppressContentEditableWarning={ true }
           ref={ el => (label.current = el) }
           onInput={ onInput }
           className={ `${ styles.label } ${ isEmpty ? styles.labelEmpty : '' }` }>
        { children }
      </div>
    </>
  )
}