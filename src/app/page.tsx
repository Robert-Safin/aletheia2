import { SignIn, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import { PrismaClient } from "@prisma/client";

const RootPage = async () => {
  return (
    <div className="h-screen flex flex-col justify-center">
      <h1 className="main-header text-5xl tracking-widest text-center mb-10">
        Aletheia
      </h1>
      <h2 className="secondary-header text-3xl text-center mb-20">
        Discover events and offers next to you
      </h2>
      <div className="flex justify-evenly">
        <Link className="btn-primary-small" href={`/signin`}>
          Sign in
        </Link>

        <Link className="btn-primary-small" href={`/signup`}>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default RootPage;
