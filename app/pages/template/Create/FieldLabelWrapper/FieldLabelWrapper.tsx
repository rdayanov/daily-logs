import { ReactNode, useState } from 'react'
import { Rate } from '~/shared/inputs/rate'
import { FieldLabel } from './FieldLabel'
import { FieldRatable } from './FieldRatable'

import styles from './styles.module.pcss'

interface FieldLabelWrapperProps {
  children: ReactNode;
  rateCompatible: boolean;
}

export const FieldLabelWrapper = ({ children, rateCompatible }: FieldLabelWrapperProps) => {
  const [ratable, setRatable] = useState(false)

  return (
    <div className={ styles.fieldLabelWrapper }>
      <div className={ styles.fieldLabel }>
        <FieldLabel name="label">{ children }</FieldLabel>
        <FieldRatable onChange={ setRatable }
                      disabled={ !rateCompatible }/>
      </div>

      {
        ratable
          ? <Rate hideLabel={ true }
                  disabled={ true }
                  name="work-rate"/>
          : <></>
      }
    </div>
  )
}