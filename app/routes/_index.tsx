import type { MetaFunction, ActionFunctionArgs } from '@remix-run/node'
import { Rate } from '@dl/shared/inputs/rate'
import { Form } from '@remix-run/react'
import React from 'react'

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

      <button>Send</button>
    </Form>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const rate = formData.get('rate')
  console.log(rate)
  return null
}
