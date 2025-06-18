import { ReactNode, useEffect, useRef, useState } from 'react'
import { noop } from '~/shared/cdk/noop'

import styles from './styles.module.pcss'

interface FieldLabelProps {
  name: string;
  children: ReactNode;
  onChange?: (value: string) => void;
}

const EMPTY_LABEL = /\S/

export const FieldLabel = ({ name, children, onChange = noop }: FieldLabelProps) => {
  const input = useRef<HTMLInputElement | null>(null)
  const label = useRef<HTMLDivElement | null>(null)

  const [isEmpty, setIsEmpty] = useState(false)

  const onInput = () => {
    if (input.current && label.current) {
      input.current.value = label.current.innerText
    }
    setIsEmpty(!!label.current?.innerText && !EMPTY_LABEL.test(label.current.innerText))
  }

  useEffect(() => {
    if (input.current && label.current) {
      onInput()
    }
  }, [input, label])

  const propagateChange = () => {
    input.current && onChange(input.current.value)
  }

  return (
    <>
      <input type="hidden"
             name={ name }
             ref={ (el) => (input.current = el) }/>
      <div contentEditable
           suppressContentEditableWarning={ true }
           ref={ el => (label.current = el) }
           onInput={ onInput }
           onBlur={ propagateChange }
           className={ `${ styles.label } ${ isEmpty ? styles.labelEmpty : '' }` }>
        { children }
      </div>
    </>
  )
}