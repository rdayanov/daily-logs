import { TemplateCreatePage } from '@dl/pages/template/Create'
import type { ActionFunctionArgs } from '@remix-run/node'
import { PrismaClient } from '~/generated/prisma'
import { FieldType } from '~/generated/prisma/enums'

export default TemplateCreatePage

const prismaClient = new PrismaClient()

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const fieldTypes = formData.getAll('type') as FieldType[]
  const fieldValues = formData.getAll('value') as string[]
  const fieldLabels = formData.getAll('label') as string[]
  const fieldRatable = formData.getAll('ratable') as ('false' | 'true')[]

  const template = await prismaClient.template.create({ data: {} })

  try {
    await prismaClient.$connect()
    const fields = fieldLabels.map((label, index) => {
      const defaultValue = fieldValues[index]
      const type = fieldTypes[index]
      const ratable = fieldRatable[index] === 'true'
      return {
        type,
        defaultValue,
        label,
        ratable,
        templateId: template.id,
      }
    })

    console.log(fields)

    await prismaClient.templateField.createMany({
      data: fields,
    })
  } catch (e) {
    console.error(e)
    throw e
  }

  return null
}
