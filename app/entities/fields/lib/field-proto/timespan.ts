import { FieldType } from '~/generated/prisma/enums'
import { CommonFieldProto } from './common-field-proto.interface'

export function getTimespanProto(): CommonFieldProto {
  return {
    type: FieldType.TIMESPAN,
    rateCompatible: true,
    defaultLabel: 'Timespan',
  }
}