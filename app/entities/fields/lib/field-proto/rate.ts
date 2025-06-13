import { FieldType } from '~/generated/prisma/enums'
import { CommonFieldProto } from './common-field-proto.interface'

export function getRateProto(): CommonFieldProto {
  return {
    type: FieldType.RATE,
    rateCompatible: false,
    defaultLabel: 'Rate',
  }
}