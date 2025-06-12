import { ReactNode, useEffect, useState } from 'react'
import { FieldType } from '~/generated/prisma/enums'

import styles from './styles.module.pcss'

interface TimespanProps {
  name: string;
  value?: `${ string };${ string }`;
  children: [ReactNode, ReactNode, ReactNode];
}

export const Timespan = ({ name, children }: TimespanProps) => {
  const [header, startLabel, endLabel] = children

  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(`${ start };${ end }`)
  }, [start, end])

  return (
    <>
      <input type="hidden"
             name={ `id` }
             value={ name }/>
      <input type="hidden"
             name={ `type` }
             value={ FieldType.TIMESPAN }/>
      <fieldset className={ styles.fieldset }>
        <legend>{ header }</legend>
        <label htmlFor={ `${ name }-start` }>
          { startLabel }:
        </label>

        <input type="time"
               name={ `${ name }-start` }
               value={ start }
               onChange={ (ev) => setStart(ev.target.value) }/>

        <label htmlFor={ `${ name }-end` }>
          { endLabel }:
        </label>

        <input type="time"
               name={ `${ name }-end` }
               value={ end }
               onChange={ (ev) => setEnd(ev.target.value) }/>
      </fieldset>
      <input type="hidden"
             name={ `value` }
             value={ value }/>
    </>
  )
}
