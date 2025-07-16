import { auth } from "@/auth";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

export default async function Layout({children,}: Readonly<{children: React.ReactNode;}>) {

    const session = await auth()

    if(!session) redirect('/sign-in')

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
}
