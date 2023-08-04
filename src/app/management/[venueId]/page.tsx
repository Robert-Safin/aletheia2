import ManagementViewPage from "@/components/management/ManagementViewPage";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import RatingToStars from "@/components/ui/icons/RatingToStars";
import UnauthorizedScreen from "@/components/ui/unauthorized/Unauthorized";
import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FC } from "react";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
interface Props {
  params: {
    venueId: string;
  };
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

const findVenue = async (venueId: number) => {
  const prisma = new PrismaClient();
  const venue = await prisma.venue.findUnique({
    where: {
      id: venueId,
    },
    include: {
      venuePhotos: true,
      singleEvents: true,
      multipleEvents: true,
      singleOffers: true,
      multipleOffers: true,
    },
  });
  return venue;
};


const deleteVenue = async (venueId: number) => {
  'use server'
  const prisma = new PrismaClient();

  const photosToDelete = await prisma.venuePhoto.findMany({
    where: {
      venueId: venueId,
    }
  })

  photosToDelete.forEach(async (photo) => {
    await cloudinary.v2.uploader.destroy(photo.cloudinaryPublicId);
  });


  await prisma.venue.delete({
    where: {
      id: venueId,
    },
  });
  await prisma.$disconnect();

  revalidatePath("/management");
  redirect("/home");
}


const ManagementViewVenuePage: FC<Props> = async (props) => {
  const user = await currentUser();
  const userClerkId = user?.id;

  const isOwnerResult = await isOwner(
    Number(props.params.venueId),
    userClerkId!
  );

  if (!isOwnerResult) {
    return <UnauthorizedScreen />;
  }


  const venue = await findVenue(Number(props.params.venueId));



  return (
    <ContainerGray>
      <ManagementViewPage venue={venue!} deleteVenue={deleteVenue}/>
    </ContainerGray>
  );
};

export default ManagementViewVenuePage;
