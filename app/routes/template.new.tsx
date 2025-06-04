import { TemplateCreatePage } from '@dl/pages/template/Create'
import type { ActionFunctionArgs } from '@remix-run/node'
import { PrismaClient } from '~/generated/prisma'
import { FieldType } from '~/generated/prisma/enums'

export default TemplateCreatePage

const prismaClient = new PrismaClient()

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const logFields = formData.getAll('id') as string[]
  const fieldTypes = formData.getAll('type') as FieldType[]
  const fieldValues = formData.getAll('value') as string[]

  const template = await prismaClient.template.create({ data: {} })

  try {
    await prismaClient.$connect()
    await prismaClient.templateField.createMany({
      data: logFields.map((id, index) => {
        const defaultValue = fieldValues[index]
        const type = fieldTypes[index]
        return {
          type,
          defaultValue,
          label: id,
          ratable: false,
          templateId: template.id,
        }
      }),
    })
  } catch (e) {
    console.error(e)
    throw e
  }

  return null
}
