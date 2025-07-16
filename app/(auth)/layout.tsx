import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="auth-container">

      <div className="auth-form">
        <div className="auth-box">
          <div>
            <Image src={"/icons/logo.svg"} alt="logo" height={37} width={37} />
            <h1 className="text-2xl text-white font-semibold">BookStore</h1>
          </div>

          <div>{children}</div>
        </div>
      </div>

      <div className="auth-illustration">
          <Image
            src={"/images/auth-illustration.png"}
            alt="auth illustration"
            fill
            className="object-cover"
            />
      </div>
    </div>
  );
}
