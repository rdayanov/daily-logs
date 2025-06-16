import { ReactNode, useEffect, useState } from 'react'
import { Rate } from '~/shared/inputs/rate'
import { FieldLabel } from './FieldLabel'
import { FieldRatable } from './FieldRatable'

import styles from './styles.module.pcss'

interface FieldLabelWrapperProps {
  children: ReactNode;
  rateCompatible: boolean;
}

export const FieldLabelWrapper = ({ children, rateCompatible }: FieldLabelWrapperProps) => {
  const [ratable, setRatable] = useState(false)
  const [label, setLabel] = useState<string>('')
  const [showHandle, setShowHandle] = useState(false)

  useEffect(() => {
    setShowHandle(/\S/.test(label))
  }, [label])

  return (
    <div className={ styles.fieldLabelWrapper }
         onDragStart={ ev => ev.dataTransfer.setData('text/plain', label) }>
      {
        showHandle &&
        <div
          className={ styles.fieldDragHandle }>
          ☷
        </div>
      }

      <div className={ styles.fieldLabel }>
        <FieldLabel name="label"
                    onChange={ setLabel }>{ children }</FieldLabel>
        <FieldRatable onChange={ setRatable }
                      disabled={ !rateCompatible }/>
      </div>

      {
        ratable
          ? <Rate hideLabel={ true }
                  disabled={ true }
                  name="work-rate"/>
          : <></>
      }
    </div>
  )
}