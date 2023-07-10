import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  let memo = null

  if (body.content)
    await prisma.memos.create({
      data: {
        content: body.content,
      },
    }).then((response: any) => {
      memo = response
    })

  return {
    memo: memo
  }
})
