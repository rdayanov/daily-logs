import { FieldType } from '~/generated/prisma/enums'
import { CommonFieldProto } from './common-field-proto.interface'

export function getTextboxProto(): CommonFieldProto {
  return {
    type: FieldType.TEXTBOX,
    rateCompatible: false,
    defaultLabel: 'Summary',
  }
}