import type { MetaFunction, ActionFunctionArgs } from '@remix-run/node'
import { Rate } from '@dl/shared/inputs/rate'
import { Form } from '@remix-run/react'
import React from 'react'
import { Timespan } from '~/shared/inputs/timespan'

import styles from '../styles/styles.module.pcss'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
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

      <button>Send</button>
    </Form>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  console.log(formData)
  return null
}
