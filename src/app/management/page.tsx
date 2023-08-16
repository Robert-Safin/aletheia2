import VenueManagementCard from "@/components/management/ManagementVenueCard";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const ManagementPage: FC = async () => {
  const user = await currentUser();


  const prisma = new PrismaClient();
  const venues = await prisma.venue.findMany({
    where: {
      clerkId: user?.id,
    },
    include: {
      venuePhotos: true,
      singleEvents: true,
      multipleEvents: true,
      singleOffers: true,
      multipleOffers: true,
    },
  });

  const formatDate = new Date(user!.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ContainerGray>
      <div className="flex flex-col w-full text-center">
        <h2 className="secondary-header">Welcome</h2>
        <h1 className="main-header my-1">{user?.firstName}</h1>
        <p className="small-text">Joined: {formatDate}</p>
        <p className="small-text mt-1 mb-2">{venues.length} Venues</p>
        <Link href={"/management/registerVenue"}>
          <button className="btn-primary-small mx-auto">
            REGISTER NEW VENUE
          </button>
        </Link>
      </div>

      <div className="container px-4">
        {venues && <h2 className="secondary-header mt-4 mb-2">Your venues</h2>}
        {venues &&
          venues.map((venue) => (
            <VenueManagementCard key={venue.id} venue={venue} />
          ))}
      </div>
    </ContainerGray>
  );
};

export default ManagementPage;
