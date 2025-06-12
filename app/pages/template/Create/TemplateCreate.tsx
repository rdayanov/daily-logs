import { Markdown } from '@dl/shared/inputs/markdown'
import { Rate } from '@dl/shared/inputs/rate'
import { Timespan } from '@dl/shared/inputs/timespan'
import { Form } from '@remix-run/react'
import { TemplateField } from '~/entities/fields'
import { FieldType } from '~/generated/prisma/enums'
import { FieldLabel } from './FieldLabel'
import styles from './styles.module.pcss'

export const TemplateCreatePage = () => {
  return (
    <Form className={ styles.form }
          method="POST"
          navigate={ false }>
      <TemplateField fieldType={ FieldType.RATE }>
        <Rate name="rate">
          <FieldLabel name="label">Rating</FieldLabel>
        </Rate>
      </TemplateField>

      <TemplateField fieldType={ FieldType.TIMESPAN }>
        <Timespan name="work">
          <FieldLabel name="label">Work</FieldLabel>
          <>Start</>
          <>End</>
        </Timespan>
      </TemplateField>

      <TemplateField fieldType={ FieldType.TEXTBOX }>
        <Markdown name="summary">
          <div className={ styles.fieldLabelWrapper }>
            <FieldLabel name="label">Summary</FieldLabel>
          </div>
        </Markdown>
      </TemplateField>

      <button>Send</button>
    </Form>
  )
}