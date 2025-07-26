import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { prisma } from "@/lib/database/prisma";
import { redirect } from "next/navigation";
import redis from "@/lib/redis";
import { getOrSetCache } from "@/lib/utils";


const page = () => {
    const session = await auth();

  if (!session?.user.id) return redirect("/sign-in");

  const getData = async () => {
    const data = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });
    return data;
  };

  const books = await getOrSetCache<Book[]>("books", getData);

  return (
    <section  className='w-full p-7 rounded-1xl bg-white'>
         <div className='flex flex-wrap justify-between gap-2 items-center'>
            <h2 className='text-xl font-semibold'>All books</h2>
            <Button className='bg-primary-admin' asChild>
                <Link className='text-white' href={"/admin/books/new"}>+ Create New Book</Link>
            </Button>
         </div>
            <BookList title={"Popular Books"} books={books} />

    </section>
  );
}

export default page;
