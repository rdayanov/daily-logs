import { FieldType } from '~/generated/prisma/enums'
import { CommonFieldProto } from './common-field-proto.interface'
import { getRateProto } from './rate'
import { getTextboxProto } from './textbox'
import { getTimespanProto } from './timespan'

export type FieldProto = CommonFieldProto

export function getFieldProto(fieldType: FieldType): FieldProto | null {
  switch (fieldType) {
    case FieldType.RATE:
      return getRateProto()
    case FieldType.TIMESPAN:
      return getTimespanProto()
    case FieldType.TEXTBOX:
      return getTextboxProto()
    default:
      return null
  }
}
