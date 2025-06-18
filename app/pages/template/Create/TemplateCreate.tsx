import { Markdown } from '@dl/shared/inputs/markdown'
import { Rate } from '@dl/shared/inputs/rate'
import { Timespan } from '@dl/shared/inputs/timespan'
import { Form } from '@remix-run/react'
import { DragEvent, useReducer } from 'react'
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
              <FieldLabelWrapper rateCompatible={ field.rateCompatible }
                                 fieldIndex={ index }>{ field.defaultLabel }</FieldLabelWrapper>
            </Rate>
          </TemplateField>
        )
      case FieldType.TIMESPAN:
        return (
          <TemplateField fieldType={ FieldType.TIMESPAN }>
            <Timespan name="work"
                      value={ field.value as TimespanField['value'] }
                      onChange={ v => onFieldChange(v, index) }>
              <FieldLabelWrapper rateCompatible={ field.rateCompatible }
                                 fieldIndex={ index }>{ field.defaultLabel }</FieldLabelWrapper>
            </Timespan>
          </TemplateField>
        )
      case FieldType.TEXTBOX:
        return (
          <TemplateField fieldType={ FieldType.TEXTBOX }>
            <Markdown name="summary"
                      content={ field.value }
                      onChange={ v => onFieldChange(v, index) }>
              <FieldLabelWrapper rateCompatible={ field.rateCompatible }
                                 fieldIndex={ index }>{ field.defaultLabel }</FieldLabelWrapper>
            </Markdown>
          </TemplateField>
        )
      default:
        return (<></>)
    }
  })

  const onDragStart = (ev: DragEvent<HTMLDivElement>, from: number) => {
    ev.dataTransfer.setData('text/plain', `${ from }`)
    ev.dataTransfer.setData(FIELD_DRAG_EVENT, 'true')
    ev.dataTransfer.effectAllowed = 'move'
  }

  const onDragEnter = (ev: DragEvent<HTMLDivElement>) => {
    if (ev.dataTransfer.types.includes(FIELD_DRAG_EVENT)) {
      ev.preventDefault()
    }
  }

  const onDragOver = (ev: DragEvent<HTMLDivElement>) => {
    if (ev.dataTransfer.types.includes(FIELD_DRAG_EVENT)) {
      ev.dataTransfer.dropEffect = 'move'
      ev.preventDefault()
    }
  }

  const onDrop = (ev: DragEvent<HTMLDivElement>, insertAt: number) => {
    const from = +ev.dataTransfer.getData('text/plain')
    dispatch({ type: 'insert', from, insertAt })
  }

  return (
    <TemplateStateContext.Provider value={ { state, dispatch } }>
      <Form className={ styles.form }
            method="POST"
            navigate={ false }>
        {
          templateFields.map((field, index) => (
            <div key={ index }>
              <div onDragOver={ onDragOver }
                   onDragEnter={ onDragEnter }
                   onDrop={ ev => onDrop(ev, index) }
                   className={ styles.dragDropArea }></div>
              <div
                className={ styles.dragHandle }
                draggable={ true }
                onDragStart={ ev => onDragStart(ev, index) }>
                { field }
              </div>
              <div onDragOver={ onDragOver }
                   onDragEnter={ onDragEnter }
                   onDrop={ ev => onDrop(ev, index) }
                   className={ styles.dragDropArea }></div>
            </div>
          ))
        }

        <AddField onFieldSelected={ addFieldToTemplate }/>

        <button>Send</button>
      </Form>

    </TemplateStateContext.Provider>
  )
}