import { ReactNode } from 'react'
import { FieldType } from '~/generated/prisma/enums'

interface TemplateFieldProps {
  fieldType: FieldType;
  children: ReactNode;
  id?: string;
}

export const TemplateField = ({ fieldType, id, children }: TemplateFieldProps) => {
  return (
    <>
      <input type="hidden"
             name="id"
             value={ id }/>
      <input type="hidden"
             name="type"
             value={ fieldType }/>
      { children }
    </>
  )
}