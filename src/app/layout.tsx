import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/user";
import { getMe } from "@/lib/actions";
import { isRequestError } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interview Book",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 antialiased`}>
        <UserProvider user={isRequestError(user) ? null : user}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
