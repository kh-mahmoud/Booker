import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { after } from "next/server";
import { prisma } from "@/lib/database/prisma";

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "Booker",
  description: "Booker is a modern university library app to browse, borrow, and manage academic books with ease."
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  after(async () => {
    if (!session?.user) return;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { lastActivity: true },
    });

    if(!user?.lastActivity) return 

    const now = new Date();
    const last = user?.lastActivity;

    if (last && now.getTime() - last.getTime() < 60_000) return;

    //when the page is seen by the user we update the activity
    await prisma.user.update({
      where: { id: session.user.id },
      data: { lastActivity: now },
    });

  });

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster richColors position="bottom-right" expand={false} />
        </body>
      </SessionProvider>
    </html>
  );
}
