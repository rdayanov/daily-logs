import { ReactNode, useEffect, useState } from 'react'

import styles from './styles.module.pcss'

interface TimespanProps {
  name: string;
  value?: `${ string };${ string }`;
  children: ReactNode;
}

export const Timespan = ({ name, children }: TimespanProps) => {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(`${ start };${ end }`)
  }, [start, end])

  return (
    <>
      <fieldset className={ styles.fieldset }>
        <legend>{ children }</legend>
        <label htmlFor={ `${ name }-start` }>
          Start:
        </label>

        <input type="time"
               name={ `${ name }-start` }
               value={ start }
               onChange={ (ev) => setStart(ev.target.value) }/>

        <label htmlFor={ `${ name }-end` }>
          End:
        </label>

        <input type="time"
               name={ `${ name }-end` }
               value={ end }
               onChange={ (ev) => setEnd(ev.target.value) }/>
      </fieldset>
      <input type="hidden"
             name="value"
             value={ value }/>
    </>
  )
}
