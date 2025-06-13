import { Markdown } from '@dl/shared/inputs/markdown'
import { Rate } from '@dl/shared/inputs/rate'
import { Timespan } from '@dl/shared/inputs/timespan'
import { Form } from '@remix-run/react'
import { TemplateField } from '~/entities/fields'
import { FieldType } from '~/generated/prisma/enums'
import { FieldLabelWrapper } from './FieldLabelWrapper'
import styles from './styles.module.pcss'

export const TemplateCreatePage = () => {
  return (
    <Form className={ styles.form }
          method="POST"
          navigate={ false }>
      <TemplateField fieldType={ FieldType.RATE }>
        <Rate name="rate">
          <FieldLabelWrapper rateCompatible={ false }>Rating</FieldLabelWrapper>
        </Rate>
      </TemplateField>

      <TemplateField fieldType={ FieldType.TIMESPAN }>
        <Timespan name="work">
          <FieldLabelWrapper rateCompatible={ true }>Work</FieldLabelWrapper>
          <>Start</>
          <>End</>
        </Timespan>
      </TemplateField>

      <TemplateField fieldType={ FieldType.TEXTBOX }>
        <Markdown name="summary">
          <FieldLabelWrapper rateCompatible={ false }>Summary</FieldLabelWrapper>
        </Markdown>
      </TemplateField>

      <button>Send</button>
    </Form>
  )
}