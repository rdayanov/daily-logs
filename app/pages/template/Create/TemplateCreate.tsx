import { Markdown } from '@dl/shared/inputs/markdown'
import { Rate } from '@dl/shared/inputs/rate'
import { Timespan } from '@dl/shared/inputs/timespan'
import { Form } from '@remix-run/react'
import { useState } from 'react'
import { FieldProto, getFieldProto, TemplateField } from '~/entities/fields'
import { FieldType } from '~/generated/prisma/enums'
import dragAnDrop from '~/shared/cdk/drag-and-drop'
import { AddField } from './AddField'
import { FieldLabelWrapper } from './FieldLabelWrapper'
import styles from './styles.module.pcss'


export const TemplateCreatePage = () => {
  const [fields, updateFields] = useState(
    [FieldType.RATE, FieldType.TIMESPAN, FieldType.TEXTBOX]
      .map(f => getFieldProto(f))
      .filter((f): f is FieldProto => !!f),
  )

  const addFieldToTemplate = (fieldType: FieldType) => {
    const fieldProto = getFieldProto(fieldType)
    if (fieldProto) {
      updateFields([...fields, fieldProto])
    }
  }

  const templateFields = fields.map((field: FieldProto) => {
    switch (field.type) {
      case FieldType.RATE:
        return (
          <TemplateField fieldType={ FieldType.RATE }>
            <Rate name="rate">
              <FieldLabelWrapper rateCompatible={ field.rateCompatible }>{ field.defaultLabel }</FieldLabelWrapper>
            </Rate>
          </TemplateField>
        )
      case FieldType.TIMESPAN:
        return (
          <TemplateField fieldType={ FieldType.TIMESPAN }>
            <Timespan name="work">
              <FieldLabelWrapper rateCompatible={ field.rateCompatible }>{ field.defaultLabel }</FieldLabelWrapper>
            </Timespan>
          </TemplateField>
        )
      case FieldType.TEXTBOX:
        return (
          <TemplateField fieldType={ FieldType.TEXTBOX }>
            <Markdown name="summary">
              <FieldLabelWrapper rateCompatible={ field.rateCompatible }>{ field.defaultLabel }</FieldLabelWrapper>
            </Markdown>
          </TemplateField>
        )
      default:
        return (<></>)
    }
  })

  return (
    <>
      <Form className={ styles.form }
            method="POST"
            navigate={ false }>
        {
          templateFields.map((field, id) => (
            <div key={ id }>
              <div onDragOver={ dragAnDrop.onDragOver }
                   onDragEnter={ dragAnDrop.onDragEnter }
                   onDrop={ dragAnDrop.onDrop }
                   className={ styles.dragDropArea }></div>
              <div
                className={ styles.dragHandle }
                draggable={ true }
                onDragStart={ dragAnDrop.onDragStart }
                onDragEnd={ dragAnDrop.onDragEnd }>
                { field }
              </div>
              <div onDragOver={ dragAnDrop.onDragOver }></div>
            </div>
          ))
        }

        <AddField onFieldSelected={ addFieldToTemplate }/>

        <button>Send</button>
      </Form>

    </>
  )
}