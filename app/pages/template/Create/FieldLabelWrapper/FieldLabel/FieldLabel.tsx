import { ReactElement, ReactNode } from 'react'
import { noop } from '~/shared/cdk/noop'
import styles from './styles.module.pcss'

interface FieldLabelProps {
  name: string;
  label: string;
  onChange?: (value: string) => void;
  onDelete?: () => void;
  handleAction?: ReactNode;
  trailingIcon?: ReactNode;
  trailingAction?: ReactNode;
}

export const FieldLabel = ({ name, label, onChange = noop, onDelete, ...children }: FieldLabelProps) => {
  const actionEnabled = !!children.trailingAction && !(children.trailingAction as ReactElement<{
    disabled?: boolean
  }>).props.disabled
  const onkeydown = (ev: KeyboardEvent) => {
    if (!onDelete) return
    if (!ev.ctrlKey && !ev.metaKey) return
    if (ev.key === 'Backspace' || ev.key === 'Delete') {
      !label && onDelete()
    }
  }
  return (
    <div className={ styles.wrapper }>
      { children.handleAction }
      <input type="text"
             name={ name }
             value={ label }
             onInput={ (ev) => onChange(ev.currentTarget.value) }
             className={ styles.label }
             onKeyDown={ onkeydown }/>
      <div className={ `${ styles.trailingIcon } ${ actionEnabled && styles.trailingIconOffset }` }>
        { children.trailingIcon }
      </div>
      <div className={ styles.trailingAction }>
        { children.trailingAction }
      </div>
    </div>
  )
}