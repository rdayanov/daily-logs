import { Markdown } from '@dl/shared/inputs/markdown'
import { Rate } from '@dl/shared/inputs/rate'
import { Timespan } from '@dl/shared/inputs/timespan'
import { Form } from '@remix-run/react'
import { useState } from 'react'
import { FieldLabel } from './FieldLabel'
import styles from './styles.module.pcss'

export const TemplateCreatePage = () => {
  const [value, setValue] = useState(0)

  return (
    <Form className={ styles.form }
          method="POST"
          navigate={ false }>
      <Rate name="rate"
            value={ value }
            onChange={ setValue }>
        <FieldLabel name="label">Rating</FieldLabel>
      </Rate>

      <Timespan name="work">
        <FieldLabel name="label">Work</FieldLabel>
        <>Start</>
        <>End</>
      </Timespan>

      <Markdown name="summary">
        <FieldLabel name="label">Summary</FieldLabel>
      </Markdown>

      <button>Send</button>
    </Form>
  )
}