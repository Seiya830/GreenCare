import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  let plant = null

  if (body.name)
    await prisma.plants.create({
      data: {
        name: body.name,
      },
    }).then((response) => {
      plant = response
    })

  return {
    plant: plant
  }
})
