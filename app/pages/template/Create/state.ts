import { createContext } from 'react'
import { FieldProto, getFieldProto } from '~/entities/fields'
import { FieldType } from '~/generated/prisma/enums'

export interface TemplateFieldType extends FieldProto {
  id?: string;
  type: FieldType;
  label: string;
  value: string;
  ratable: boolean;
}

export interface TimespanField extends TemplateFieldType {
  type: typeof FieldType.TIMESPAN;
  value: `${ string };${ string }`;
}

export function toTemplateField(fieldProto: FieldProto): TemplateFieldType {
  switch (fieldProto.type) {
    case FieldType.TIMESPAN:
      return {
        ...fieldProto,
        type: FieldType.TIMESPAN,
        label: fieldProto.defaultLabel,
        ratable: false,
        value: ';',
      }
    default: {
      const value = fieldProto.type === 'TEXTBOX' ? undefined! : ''
      return {
        ...fieldProto,
        label: fieldProto.defaultLabel,
        ratable: false,
        value,
      }
    }
  }
}

export type State = TemplateFieldType[]
export type Action =
  { type: 'add', fieldType: FieldType } |
  { type: 'insert', insertAt: number, from: number } |
  { type: 'update', update: Partial<TemplateFieldType>, index: number }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const fieldProto = getFieldProto(action.fieldType)
      if (fieldProto) {
        return [...state, toTemplateField(fieldProto)]
      }
      return state
    }
    case 'insert': {
      const from = action.from
      const at = action.insertAt
      const item = state[from]
      if (at > from) {
        return [...state.slice(0, from), ...state.slice(from + 1, at), item, ...state.slice(at)]
      }

      return [...state.slice(0, at), item, ...state.slice(at, from), ...state.slice(from + 1)]
    }
    case 'update': {
      const field = { ...state[action.index], ...action.update }
      return [...state.slice(0, action.index), field, ...state.slice(action.index + 1)]
    }
  }
}

export type TemplateStateContextType = { state: State; dispatch: (action: Action) => void; }
export const TemplateStateContext = createContext<TemplateStateContextType>({} as TemplateStateContextType)
