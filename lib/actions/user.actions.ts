"use server";

import { prisma } from "../database/prisma";

export const getUser = async (param: string) => {
  const user = await prisma.user.findFirst({

    where: {
      OR: [
        {
          id: param,
        },
        { email: param },
      ],
    },
  });

  return user;
};
