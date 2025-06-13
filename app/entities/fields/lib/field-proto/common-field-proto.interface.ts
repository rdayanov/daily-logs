import { FieldType } from '~/generated/prisma/enums'

export interface CommonFieldProto {
  type: FieldType;
  rateCompatible: boolean;
  defaultLabel: string;
}
