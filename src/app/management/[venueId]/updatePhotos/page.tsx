import ManagementUploadPhotos, {
} from "@/components/management/ManagementUploadPhotos";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import UnauthorizedScreen from "@/components/ui/unauthorized/Unauthorized";
import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { FC } from "react";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

const updateVenuePhotos = async (venueId: number, base64: string[]) => {
  "use server";

  const prisma = new PrismaClient();
  const existingVenuePhotos = await prisma.venuePhoto.findMany({
    where: {
      venueId: venueId,
    },
  });

  existingVenuePhotos.forEach(async (photo) => {
    await cloudinary.v2.uploader.destroy(photo.cloudinaryPublicId);
  });

  await prisma.venuePhoto.deleteMany({
    where: {
      venueId: venueId,
    },
  });

  for (let file of base64) {
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(file, {
      folder: "Aletheia",
    });

    await prisma.venuePhoto.create({
      data: {
        venueId: venueId,
        cloudinaryUrl: cloudinaryResponse.secure_url,
        cloudinaryPublicId: cloudinaryResponse.public_id,
      },
    });
  }

  prisma.$disconnect();
  revalidatePath(`/management/${venueId}`);
  redirect(`/management/${venueId}`);
};

const UpdateVenuePhotosPage: FC<Props> = async (props) => {
  const user = await currentUser();
  const userClerkId = user?.id;

  const isOwnerResult = await isOwner(
    Number(props.params.venueId),
    userClerkId!
  );

  if (!isOwnerResult) {
    return <UnauthorizedScreen />;
  }

  return (
    <ContainerGray>
      <BackLink
        href={`/management/${props.params.venueId}`}
        name="Back to Venue"
      />

      <ManagementUploadPhotos
        venueId={Number(props.params.venueId)}
        updateVenuePhotos={updateVenuePhotos}
      />
    </ContainerGray>
  );
};

export default UpdateVenuePhotosPage;
