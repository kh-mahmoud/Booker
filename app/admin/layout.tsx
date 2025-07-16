import { auth } from "@/auth";
import { redirect } from "next/navigation";
import '../styles/admin.css'
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  

  const isAdmin = session?.user?.role === "ADMIN";
  
  if (!isAdmin) redirect("/");
  

  return (
    <main className="flex flex-row min-h-screen w-full">
      <div>
        <Sidebar session={session}/>
      </div>

      <div className="admin-container">
        <div>
            <Header session={session}/>
        </div>
        {children}
      </div>
    </main>
  );
}
