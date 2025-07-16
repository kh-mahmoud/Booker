"use server";

import { record } from "zod";
import { prisma } from "../database/prisma";
import { books_schema } from "../validations";
import dayjs from "dayjs";
import redis from "../redis";

export const createBook = async (params: BookParams) => {
  const result = books_schema.safeParse(params);

  if (!result.success) {
    throw new Error("validation is not succcesfull");
  }

  try {
    const book = await prisma.book.create({
      data: { ...params, availableCopies: params.totalCopies },
    });

    if(book) await redis.del("books");
    
    return {
      success: true,
      data: book,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Something went wrong while creating the book try later !",
    };
  } finally {
    await prisma.$disconnect();
  }
};

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await prisma.book.findUnique({ where: { id: bookId } });

    if (!book || book.availableCopies === 0) {
      return {
        success: false,
        message: "Book is not available",
      };
    }

    const dueDate = dayjs().add(7, "days").format("ddd MMM d YYYY");

    const result = await prisma.$transaction(async (prisma) => {

      const record = await prisma.borrowRecords.create({
        data: {
          userId,
          bookId,
          dueDate,
        },
      });

      await prisma.book.update({
        where: { id: bookId },
        data: {
          availableCopies: { decrement: 1 },
        },
      });

      return { success: true, data: record };
    });
    
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};
