import { noop } from '~/shared/cdk/noop'
import styles from './styles.module.pcss'

interface FieldLabelProps {
  name: string;
  label: string;
  onChange?: (value: string) => void;
}

export const FieldLabel = ({ name, label, onChange = noop }: FieldLabelProps) => {
  return (
    <input type="text"
           name={ name }
           value={ label }
           onInput={ (ev) => onChange(ev.currentTarget.value) }
           className={ styles.label }/>
  )
}