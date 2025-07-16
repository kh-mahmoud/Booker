'use client'

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const BorrowButton = ({bookId,userId}:{bookId:string,userId:string}) => {
  return (
    <div>
      <Button className="book-overview_btn ">
        <Image src={"/icons/book.svg"} width={20} height={20} alt={"book"} />
        <p className="font-bebas-neue text-xl text-dark-100">Borrow Book</p>
      </Button>
    </div>
  );
};

export default BorrowButton;
