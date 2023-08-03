import ManagementRefreshGoogle from "@/components/management/ManagementRefreshGoogle";
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

const refreshGoogleData = async (venueId: number) => {
  'use server'
  const prisma = new PrismaClient();
  const venue = await prisma.venue.findUnique({
    where: {
      id: venueId
    }
  })
  const googlePlaceId = venue?.googlePlaceId

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );

  const newVenueData = await response.json();

  const updateVenue = await prisma.venue.update({
    where: {
      id: venueId
    },
    data: {
      name: newVenueData.result.name,
      formattedAdress: newVenueData.result.formatted_address,
      formattedPhoneNumber: newVenueData.result.formatted_phone_number,
      website: newVenueData.result.website,
      googleMapsUrl: newVenueData.result.url,
      openingHours: newVenueData.result.opening_hours!.weekday_text!.join("\n"),
      averageRating: newVenueData.result.rating,
      totalReviews: newVenueData.result.user_ratings_total,
      latitude: newVenueData.result.geometry.location.lat,
      longitude: newVenueData.result.geometry.location.lng,
    }
  })

  await prisma.$disconnect();
  revalidatePath(`/management/${venueId}`)
  redirect(`/management/${venueId}`)


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
      <ManagementRefreshGoogle refreshGoogleData={refreshGoogleData} venueId={Number(props.params.venueId)}/>
      <ManagementUpdateDataForm venue={venue!} updateVenueDataFromOwner={updateVenueDataFromOwner}/>

    </ContainerGray>
  )
}


export default UpdateVenueDataPage
