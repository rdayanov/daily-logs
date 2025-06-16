import { ReactNode } from 'react'

import styles from './styles.module.pcss'

interface TimespanProps {
  name: string;
  value: `${ string };${ string }`;
  onChange: (value: string) => void;
  children: ReactNode;
}

export const Timespan = ({ name, children, value, onChange }: TimespanProps) => {
  const [start, end] = value.split(';')

  const setStart = (start: string) => {
    onChange(`${ start };${ end }`)
  }

  const setEnd = (end: string) => {
    onChange(`${ start };${ end }`)
  }

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
