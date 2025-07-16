"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";

const Header = ({session}:{session:Session}) => {

  const path = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5 items-center">
      <Link href={"/"} className="flex items-center gap-2 text-light-100">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <span>BookStore</span>
      </Link>

      <ul className="flex gap-4">
        <li>
          <Link
            href={"/library"}
            className={cn(
              "text-base cursor-pointer capitalize",
              path == "library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>

        <li>
          <Link href={"/my-profile"}>
            <Avatar>
              <AvatarFallback className="bg-amber-100  text-bold ">{getInitials(session.user?.name as string) || 'AU'}</AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
