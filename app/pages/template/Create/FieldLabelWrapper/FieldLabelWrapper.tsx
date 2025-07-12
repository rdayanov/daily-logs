import { GripVertical, Pencil } from 'lucide-react'
import { useContext } from 'react'
import { noop } from '~/shared/cdk/noop'
import { Rate } from '~/shared/inputs/rate'
import { TemplateStateContext } from '../state'
import { FieldLabel } from './FieldLabel'
import { FieldRatable } from './FieldRatable'

import styles from './styles.module.pcss'

interface FieldLabelWrapperProps {
  fieldIndex: number;
}

export const FieldLabelWrapper = ({ fieldIndex }: FieldLabelWrapperProps) => {
  const { state, dispatch } = useContext(TemplateStateContext)

  const { rateCompatible, ratable, label } = state[fieldIndex]

  const setRatable = (ratable: boolean) => dispatch({ type: 'update', update: { ratable }, index: fieldIndex })
  const setLabel = (label: string) => dispatch({ type: 'update', update: { label }, index: fieldIndex })
  const deleteField = (index: number) => dispatch({ type: 'delete', index })

  const ratableAction = <FieldRatable checked={ ratable }
                                      onChange={ setRatable }
                                      disabled={ !rateCompatible }/>
  const trailingIcon = <Pencil size={ 24 }/>

  return (
    <div className={ styles.fieldLabelWrapper }>
      <div
        className={ styles.fieldDragHandle }>
        <GripVertical size={ 24 }/>
      </div>

      <div className={ styles.fieldLabel }>
        <FieldLabel name="label"
                    label={ label }
                    onChange={ setLabel }
                    onDelete={ () => deleteField(fieldIndex) }
                    trailingIcon={ trailingIcon }
                    trailingAction={ ratableAction }/>
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