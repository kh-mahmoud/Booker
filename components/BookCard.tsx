import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const BookCard = ({ id, title, genre, coverColor, coverUrl,isloaned=false }: Book) => {
    const day = Math.floor(Math.random() * 30) ;
  return (

    <li className={cn(isloaned && "xs:w-52 w-full")}>
      <Link href={`/books/${id}`} className="max-xs:flex flex-col items-center justify-center">
        <BookCover coverColor={coverColor} coverUrl={coverUrl} />

        <div className={cn("mt-4",isloaned? "max-xs:flex flex-col items-center justify-center":"xs:max-w-40")}>
          <p className="book-title text-wrap">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isloaned && (
            <div>
                <div className="flex gap-2">
                    <Image src={"/icons/calendar.svg"} alt="calendar" height={18} width={18} />
                    <p className="text-light-100">{day} {day>1?"days":"day"} left to return </p>
                </div>

                <Button className="book-btn">
                     Download receipt
                </Button>
            </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
