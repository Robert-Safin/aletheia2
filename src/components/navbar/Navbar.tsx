import Link from "next/link";
import { FC } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { ImMap2 } from "react-icons/im";
import { LuSettings2 } from "react-icons/lu";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";

const fetchUsersVenue = async (clerkId: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.venue.findFirst({
    where: {
      clerkId: clerkId,
    },
  });
  return user;
};

const Navbar: FC = async () => {
  const user = await currentUser();

  let isOwner;

  if (!user) {
    isOwner = false;
  }

  if (user) {
    const userData = await fetchUsersVenue(user.id);
    if (userData) {
      isOwner = true;
    } else {
      isOwner = false;
    }
  }

  return (
    <div className="container flex items-center justify-evenly fixed bottom-0 py-4 rounded-t-xl bg-grayPrimary border-t border-black">
      <Link href={`/home`}>
        <AiOutlineHome className="icon-large" />
      </Link>
      <Link href={`/map`}>
        <ImMap2 className="icon-large" />
      </Link>
      <Link href={`/settings`}>
        <LuSettings2 className="icon-large" />
      </Link>
      {isOwner && (
        <Link href={`/management`}>
          <LiaBusinessTimeSolid className="icon-large" />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
