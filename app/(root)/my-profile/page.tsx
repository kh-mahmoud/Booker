import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { prisma } from "@/lib/database/prisma";
import React from "react";

const page = async () => {
    const books = await prisma.book.findMany({orderBy:{createdAt:"desc"}});
  
  return (
    <div>
      <form action={async () => {
          'use server'

          await signOut()
      }}>
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={books}/>
    </div>
  );
};

export default page;
