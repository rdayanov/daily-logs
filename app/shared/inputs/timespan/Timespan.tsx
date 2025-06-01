import { ReactNode } from 'react'

import './styles.module.pcss'

interface TimespanProps {
  name: string;
  value?: `${ string }-${ string }`;
  children: [ReactNode, ReactNode, ReactNode];
}

export const Timespan = ({ name, children }: TimespanProps) => {
  const [header, startLabel, endLabel] = children

  return (
    <fieldset>
      <legend>{ header }</legend>
      <label htmlFor={ `${ name }-start` }>
        { startLabel }:
      </label>

      <input type="time"
             name={ `${ name }-start` }/>

      <label htmlFor={ `${ name }-end` }>
        { endLabel }:
      </label>

      <input type="time"
             name={ `${ name }-end` }/>
    </fieldset>
  )
}
