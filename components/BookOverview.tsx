import Image from "next/image";
import BookCover from "./BookCover";
import BorrowButton from "./BorrowButton";


interface Props extends Book {
  userId: string
}

const BookOverview = ({
  id,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId
}: Props) => {

  return (
    <section className="book-overview">
      <div className="flex flex-col flex-1 gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category :{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image
              src={"/icons/star.svg"}
              width={22}
              height={22}
              alt={"rate"}
            />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>Total Books: {totalCopies}</p>

          <p>Available Books: {availableCopies}</p>
        </div>

        <p className="book-description">{description}</p>

        <BorrowButton userId={userId} bookId={id} />
      </div>

      <div className="relative flex flex-1 justify-center items-center">
        <div className="relative">
          <BookCover
            variant="wide"
            classes="z-10"
            coverColor={coverColor}
            coverUrl={coverUrl}
          />

          <div className="absolute top-5 max-md:hidden opacity-40 left-24 rotate-12 origin-bottom ">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverUrl={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
