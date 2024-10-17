import "bootstrap/dist/css/bootstrap.min.css";

import { Inter } from "next/font/google";
import { Navbar } from "../components/navbar-server";
import { MainContainer } from "../components";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { request } from "@/api/request";

export const metadata: Metadata = {
  title: "NextJS example",
  description: "by Adam Polczynski",
};

const inter = Inter({ subsets: ["latin"] });

export default async ({ children }: { children: React.ReactNode }) => {
  const authToken = cookies().get("token")?.value;
  console.warn("cookies authToken: ", authToken);
  const { body, status, statusText } = await request(
    "/profile",
    undefined,
    "authToken"
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <Navbar user={body} />
          <MainContainer>{children}</MainContainer>
        </>
      </body>
    </html>
  );
};
