import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <section  className='w-full p-7 rounded-1xl bg-white'>
         <div className='flex flex-wrap justify-between gap-2 items-center'>
            <h2 className='text-xl font-semibold'>All books</h2>
            <Button className='bg-primary-admin' asChild>
                <Link className='text-white' href={"/admin/books/new"}>+ Create New Book</Link>
            </Button>
         </div>
    </section>
  );
}

export default page;
