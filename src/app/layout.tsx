import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Jomhuria } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar/Navbar";
import { FC } from "react";

const inter = Inter({ subsets: ["latin"] });

export const jomhuria = Jomhuria({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-grayPrimary mb-12 container mx-auto" id="root">
        <body className={inter.className}>
          {props.children}
          <Navbar />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
