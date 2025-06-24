import { ReactNode, useContext } from 'react'
import { noop } from '~/shared/cdk/noop'
import { Rate } from '~/shared/inputs/rate'
import { TemplateStateContext } from '../state'
import { FieldLabel } from './FieldLabel'
import { FieldRatable } from './FieldRatable'

import styles from './styles.module.pcss'

interface FieldLabelWrapperProps {
  children: ReactNode;
  fieldIndex: number;
}

export const FieldLabelWrapper = ({ children, fieldIndex }: FieldLabelWrapperProps) => {
  const { state, dispatch } = useContext(TemplateStateContext)

  const { rateCompatible, ratable } = state[fieldIndex]

  const setRatable = (ratable: boolean) => dispatch({ type: 'update', update: { ratable }, index: fieldIndex })
  const setLabel = (label: string) => dispatch({ type: 'update', update: { label }, index: fieldIndex })

  return (
    <div className={ styles.fieldLabelWrapper }>
      <div
        className={ styles.fieldDragHandle }>
        ☷
      </div>

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