import { ReactElement, ReactNode } from 'react'
import { noop } from '~/shared/cdk/noop'
import styles from './styles.module.pcss'

interface FieldLabelProps {
  name: string;
  label: string;
  onChange?: (value: string) => void;
  handleAction?: ReactNode;
  trailingIcon?: ReactNode;
  trailingAction?: ReactNode;
}

export const FieldLabel = ({ name, label, onChange = noop, trailingIcon, ...children }: FieldLabelProps) => {
  const actionEnabled = !!children.trailingAction && !(children.trailingAction as ReactElement<{
    disabled?: boolean
  }>).props.disabled
  return (
    <div className={ styles.wrapper }>
      { children.handleAction }
      <input type="text"
             name={ name }
             value={ label }
             onInput={ (ev) => onChange(ev.currentTarget.value) }
             className={ styles.label }/>
      <div className={ `${ styles.trailingIcon } ${ actionEnabled && styles.trailingIconOffset }` }>
        { trailingIcon }
      </div>
      <div className={ styles.trailingAction }>
        { children.trailingAction }
      </div>
    </div>
  )
}