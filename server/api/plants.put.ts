import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const name = body.name;
  const lastWateredAt = body.lastWatered_at;

  if (!(id && name)) return createError({ statusCode: 400, statusMessage: "Missing id and name"});

  let plant = null;

  if (id && name) {
    plant = await prisma.plants.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        lastWatered_at: lastWateredAt,
      },
    });
  }

  return plant;
});
