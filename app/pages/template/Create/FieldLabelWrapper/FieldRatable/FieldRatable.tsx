import { Star, StarOff } from 'lucide-react'
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
          :
          <>
            <button type="button"
                    className={ styles.toggleButton }
                    onClick={ () => (onChange(!checked)) }>
              { checked ? <Star/> : <StarOff/> }
              <input type="checkbox"
                     name="ratable"
                     className={ styles.ratingToggle }
                     value="true"
                     checked={ checked }
                     onChange={ (ev) => onChange(ev.target.checked) }/>
            </button>
          </>
      }
    </>
  )
}