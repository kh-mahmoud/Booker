import React from "react";
import { redirect } from "next/navigation";
import BookOverview from "@/components/BookOverview";
import { prisma } from "@/lib/database/prisma";
import BookVideo from "@/components/BookVideo";
import { auth } from "@/auth";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const session = await auth()

  // Fetch data based on id
  const bookDetails = await prisma.book.findUnique({
    where: {
      id,
    },
  });


  if (!bookDetails) redirect("/404");

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user.id} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>

            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default Page;
