import ManagementUpdateDataForm from "@/components/management/ManagementUpdateDataForm";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerGray from "@/components/ui/containers/ContainerGray"
import UnauthorizedScreen from "@/components/ui/unauthorized/Unauthorized";
import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { FC } from "react"

interface Props {
  params: {
    venueId: string
  }
}

export interface UpdateVenueDataFromClient {
  description: string;
  categories: string;
  venueId: number;
}


const isOwner = async (venueId: number, userClerkId: string) => {
  const prisma = new PrismaClient();
  const venues = await prisma.venue.findMany({
    where: {
      clerkId: userClerkId,
    },
  });
  await prisma.$disconnect();

  if (venues.length === 0) {
    return false;
  }

  for (let venue of venues) {
    if (venue.id === venueId) {
      return true;
    }
  }
  return false;
};

const getVenue = async (venueId: number) => {
  const prisma = new PrismaClient();
  const venue = await prisma.venue.findUnique({
    where: {
      id: venueId,
    },
  });
  await prisma.$disconnect();
  return venue;
}

const updateVenueDataFromOwner = async (data:UpdateVenueDataFromClient) => {
  'use server';
  const prisma = new PrismaClient();
  const venue = await prisma.venue.update({
    where: {
      id: data.venueId
    },
    data: {
      description: data.description,
      categories: data.categories
    }
  })

  await prisma.$disconnect();
  revalidatePath(`/management/${data.venueId}`)
  redirect(`/management/${data.venueId}`)
}


const UpdateVenueDataPage:FC<Props> = async(props) => {
  const user = await currentUser();
  const userClerkId = user?.id;

  const isOwnerResult = await isOwner(
    Number(props.params.venueId),
    userClerkId!
  );

  if (!isOwnerResult) {
    return <UnauthorizedScreen />;
  }

  const venue = await getVenue(Number(props.params.venueId));

  return (
    <ContainerGray>
      <BackLink href={`/management/${props.params.venueId}`}name="Back to venue"/>
      <ManagementUpdateDataForm venue={venue!} updateVenueDataFromOwner={updateVenueDataFromOwner}/>

    </ContainerGray>
  )
}


export default UpdateVenueDataPage
