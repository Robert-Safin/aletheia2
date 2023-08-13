import NewMultipleEventForm, { NewMultipleEventFormkikData } from "@/components/management/new activity forms/NewMultipleEventForm";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import { FC } from "react";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

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
const createNewMultipleEvent = async (
  data: NewMultipleEventFormkikData,
  files: string[],
  venueId: string
) => {
  "use server";
  const prisma = new PrismaClient();

  const newMultipleEvent = await prisma.multipleEvent.create({
    data: {
      venueId: Number(venueId),
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      timeStart: data.startTime,
      timeEnd: data.endTime,
      onMonday: data.onMonday,
      onTuesday: data.onTuesday,
      onWednesday: data.onWednesday,
      onThursday: data.onThursday,
      onFriday: data.onFriday,
      onSaturday: data.onSaturday,
      onSunday: data.onSunday,
    }
  })

  for (let file of files) {
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(file, {
      folder: "Aletheia",
    });
    await prisma.multipleEventPhoto.create({
      data: {
        multipleEventId: newMultipleEvent.id,
        cloudinaryUrl: cloudinaryResponse.secure_url,
        cloudinaryPublicId: cloudinaryResponse.public_id,
      }
    })
  }
  prisma.$disconnect()

  revalidatePath(`/management/${venueId}`)
  redirect(`/management/${venueId}`)
};

const NewMultipleEventPage: FC<Props> = (props) => {
  return (
    <ContainerGray>
      <BackLink
        href={`/management/${props.params.venueId}`}
        name="Back to venue"
      />
      <NewMultipleEventForm createNewMultipleEvent={createNewMultipleEvent} venueId={props.params.venueId}/>
    </ContainerGray>
  );
};

export default NewMultipleEventPage;
