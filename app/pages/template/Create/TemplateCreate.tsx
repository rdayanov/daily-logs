import { Markdown } from '@dl/shared/inputs/markdown'
import { Rate } from '@dl/shared/inputs/rate'
import { Timespan } from '@dl/shared/inputs/timespan'
import { Form } from '@remix-run/react'
import React from 'react'
import styles from './styles.module.pcss'

export const TemplateCreatePage = () => {
  const [value, setValue] = React.useState(0)

  return (
    <Form className={ styles.form }
          method="POST"
          navigate={ false }>
      <Rate name="rate"
            value={ value }
            onChange={ setValue }>
        <>Rating</>
      </Rate>

      <Timespan name="work">
        <>Work</>
        <>Start</>
        <>End</>
      </Timespan>

      <Markdown name="summary">Summary</Markdown>

      <button>Send</button>
    </Form>
  )
}