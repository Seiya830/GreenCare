import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => { 

  const body = await readBody(event)
  let memo = null

  if(body.id)
    memo = await prisma.memos.delete({
      where: {
        id: body.id,
      },
    })
    return memo
})