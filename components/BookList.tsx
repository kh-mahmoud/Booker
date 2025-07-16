import BookCard from "./BookCard";


type  Props = {
  title: string;
  books:Book[]
  classes?:string
};

const BookList = ({ title, books, classes }:Props) => {
  return (
    <section className={"mt-24 mb-7"}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
           <BookCard key={book.title} {...book}/>
        ))}
      </ul>
    </section>
  );
};

export default BookList;
