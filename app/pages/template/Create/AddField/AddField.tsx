import { useState } from 'react'
import { FieldType } from '~/generated/prisma/enums'

import styles from './styles.module.pcss'

interface AddFieldProps {
  onFieldSelected: (fieldToAdd: FieldType) => void
}

export const AddField = ({ onFieldSelected }: AddFieldProps) => {
  const [fieldToAdd, setFieldToAdd] = useState<FieldType | 'default'>('default')

  const addField = (fieldType: FieldType | 'default') => {
    setFieldToAdd('default')
    if (fieldType !== 'default') onFieldSelected(fieldType)
  }

  return (
    <select onChange={ ev => addField(ev.target.value as FieldType | 'default') }
            onSubmit={ ev => {
              ev.preventDefault()
              ev.stopPropagation()
            } }
            value={ fieldToAdd }
            className={ styles.addNewFieldButton }>
      <option value={ 'default' }
              aria-label="Cencel">Add field
      </option>
      <hr/>
      <option value={ FieldType.RATE }>Rating</option>
      <option value={ FieldType.TIMESPAN }>Timespan</option>
      <option value={ FieldType.TEXTBOX }>Textbox</option>
    </select>
  )
}