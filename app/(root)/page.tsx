import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { prisma } from "@/lib/database/prisma";
import { redirect } from "next/navigation";
import redis from "@/lib/redis";
import { getOrSetCache } from "@/lib/utils";

const Home = async () => {
  const session = await auth();

  if (!session?.user.id) return redirect("/sign-in");

  const getData = async () => {
    const data = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });
    return data;
  };

  const books = await getOrSetCache<Book[]>("books", getData);

  const randomBook = books[Math.floor(Math.random() * books.length)];

  return (
    <>
      <BookOverview {...randomBook} userId={session.user.id} />
      <BookList title={"Popular Books"} books={books} />
    </>
  );
};

export default Home;
