import styles from './styles.module.pcss'

interface FieldRatableProps {
  onChange: (value: boolean) => void;
  disabled: boolean;
  checked: boolean;
}

export const FieldRatable = ({ onChange, disabled, checked }: FieldRatableProps) => {
  return (
    <>
      {
        disabled
          ? <input type="hidden"
                   name="ratable"
                   value="false"/>
          : <input type="checkbox"
                   name="ratable"
                   className={ styles.ratingToggle }
                   value="true"
                   checked={ checked }
                   onChange={ (ev) => onChange(ev.target.checked) }/>
      }
    </>

  )
}