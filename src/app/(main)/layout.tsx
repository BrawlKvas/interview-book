import routes from "@/constants/routes";
import { logOut } from "@/lib/actions";
import Header from "@/ui/header";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
