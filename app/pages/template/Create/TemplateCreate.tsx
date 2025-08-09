import { Markdown } from '@dl/shared/inputs/markdown'
import { Rate } from '@dl/shared/inputs/rate'
import { Timespan } from '@dl/shared/inputs/timespan'
import { Form } from '@remix-run/react'
import { DragEvent, Fragment, useReducer, useState } from 'react'
import { FieldProto, getFieldProto, TemplateField } from '~/entities/fields'
import { FieldType } from '~/generated/prisma/enums'
import { AddField } from './AddField'
import { FieldLabelWrapper } from './FieldLabelWrapper'
import { reducer, TemplateStateContext, TimespanField, toTemplateField } from './state'
import styles from './styles.module.pcss'

export const FIELD_DRAG_EVENT = 'text/daily-logs-drag'

export const TemplateCreatePage = () => {
  const [state, dispatch] = useReducer(
    reducer,
    [FieldType.RATE, FieldType.TIMESPAN, FieldType.TEXTBOX],
    (fields) => fields.map(f => getFieldProto(f))
      .filter((f): f is FieldProto => !!f)
      .map(toTemplateField),
  )

  const addFieldToTemplate = (fieldType: FieldType) => {
    dispatch({ type: 'add', fieldType })
  }

  const onFieldChange = (value: string | number, index: number) => {
    dispatch({ type: 'update', index, update: { value: typeof value === 'number' ? `${ value }` : value } })
  }

  const templateFields = state.map((field, index) => {
    switch (field.type) {
      case FieldType.RATE:
        return (
          <TemplateField fieldType={ FieldType.RATE }>
            <Rate name="rate"
                  value={ +field.value }
                  onChange={ v => onFieldChange(v, index) }>
              <FieldLabelWrapper fieldIndex={ index }/>
            </Rate>
          </TemplateField>
        )
      case FieldType.TIMESPAN:
        return (
          <TemplateField fieldType={ FieldType.TIMESPAN }>
            <Timespan name="work"
                      value={ field.value as TimespanField['value'] }
                      onChange={ v => onFieldChange(v, index) }>
              <FieldLabelWrapper fieldIndex={ index }/>
            </Timespan>
          </TemplateField>
        )
      case FieldType.TEXTBOX:
        return (
          <TemplateField fieldType={ FieldType.TEXTBOX }>
            <Markdown name="summary"
                      content={ field.value }
                      onChange={ v => onFieldChange(v, index) }>
              <FieldLabelWrapper fieldIndex={ index }/>
            </Markdown>
          </TemplateField>
        )
      default:
        return (<></>)
    }
  })

  const [dropPlaceholderIndex, setDropPlaceholderIndex] = useState<number | null>(null)
  const [dropPlaceholderPos, setDropPlaceholderPos] = useState<string | null>(null)

  const onDragStart = (ev: DragEvent<HTMLDivElement>, from: number) => {
    ev.dataTransfer.setData('text/plain', `${ from }`)
    ev.dataTransfer.setData(FIELD_DRAG_EVENT, 'true')
    ev.dataTransfer.effectAllowed = 'move'
  }

  const onDragEnd = () => {
    setDropPlaceholderIndex(null)
    setDropPlaceholderPos(null)
  }

  const onDragEnter = (ev: DragEvent<HTMLDivElement>) => {
    if (ev.dataTransfer.types.includes(FIELD_DRAG_EVENT)) {
      ev.preventDefault()
    }
  }

  const onDragOver = (ev: DragEvent<HTMLDivElement>, index: number) => {
    if (ev.dataTransfer.types.includes(FIELD_DRAG_EVENT)) {
      ev.dataTransfer.dropEffect = 'move'
      ev.preventDefault()

      const el = ev.currentTarget

      const rect = el.getBoundingClientRect()
      const itemMiddle = rect.top + rect.height / 2

      const insertAfter = ev.clientY >= itemMiddle
      const dropIndex = insertAfter ? index + 1 : index

      const top = insertAfter
        ? rect.bottom + 10
        : rect.top - 10
      setDropPlaceholderPos(`${ top }px`)

      setDropPlaceholderIndex(dropIndex)
    }
  }

  const onDrop = (ev: DragEvent<HTMLDivElement>) => {
    if (dropPlaceholderIndex === null) return

    const from = +ev.dataTransfer.getData('text/plain')
    dispatch({ type: 'insert', from, insertAt: dropPlaceholderIndex })
  }

  return (
    <TemplateStateContext.Provider value={ { state, dispatch } }>
      <Form className={ styles.form }
            method="POST"
            navigate={ false }
            style={ { '--drop-placeholder-pos': dropPlaceholderPos } }>
        {
          templateFields.map((field, index) => (
            <Fragment key={ index }>
              {
                (index === dropPlaceholderIndex) &&
                <div className={ styles.dropPlaceholder }></div>
              }
              <div
                onDragOver={ (ev) => onDragOver(ev, index) }
                onDragEnter={ onDragEnter }
                onDrop={ onDrop }
                className={ styles.dragHandle }
              >
                <div
                  draggable={ true }
                  onDragStart={ ev => onDragStart(ev, index) }
                  onDragEnd={ onDragEnd }>
                  { field }
                </div>
              </div>
              {
                (index + 1 === templateFields.length && index + 1 === dropPlaceholderIndex) &&
                <div className={ styles.dropPlaceholder }></div>
              }
            </Fragment>
          ))
        }

        <AddField onFieldSelected={ addFieldToTemplate }/>

        <button className={ styles.sendButton }>Send</button>
      </Form>

    </TemplateStateContext.Provider>
  )
}