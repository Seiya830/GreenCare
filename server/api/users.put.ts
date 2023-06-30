import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const id = body.id
  const name = body.name

  if (!(id && name)) return createError({ statusCode: 400, statusMessage: "Missing id and name"});

  let user = null

  if (id && name)
    user = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    }) 

  return user
})
