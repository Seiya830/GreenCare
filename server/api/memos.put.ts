import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const id = body.id
  const content = body.content

  if (!(id && content)) return createError({ statusCode: 400, statusMessage: "Missing id and content"});

  let memo = null

  if (id && content)
    memo = await prisma.memos.update({
      where: {
        id: id,
      },
      data: {
        content: content,
      },
    }) 

  return memo
})
