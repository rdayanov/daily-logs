import { ReactNode, useContext, useEffect, useState } from 'react'
import { noop } from '~/shared/cdk/noop'
import { Rate } from '~/shared/inputs/rate'
import { TemplateStateContext } from '../state'
import { FieldLabel } from './FieldLabel'
import { FieldRatable } from './FieldRatable'

import styles from './styles.module.pcss'

interface FieldLabelWrapperProps {
  children: ReactNode;
  rateCompatible: boolean;
  fieldIndex: number;
}

export const FieldLabelWrapper = ({ children, rateCompatible, fieldIndex }: FieldLabelWrapperProps) => {
  const { state, dispatch } = useContext(TemplateStateContext)

  const ratable = state[fieldIndex].ratable
  const setRatable = (ratable: boolean) => dispatch({ type: 'update', update: { ratable }, index: fieldIndex })

  const label = state[fieldIndex].label
  const setLabel = (label: string) => dispatch({ type: 'update', update: { label }, index: fieldIndex })

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
        <FieldRatable checked={ ratable }
                      onChange={ setRatable }
                      disabled={ !rateCompatible }/>
      </div>

      {
        ratable
          ? <Rate hideLabel={ true }
                  disabled={ true }
                  value={ 0 }
                  onChange={ noop }
                  name="work-rate"/>
          : <></>
      }
    </div>
  )
}