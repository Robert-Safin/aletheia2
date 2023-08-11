import NewSingleOfferForm, { NewSingleOfferFormkikData } from "@/components/management/new activity forms/NewSingleOfferForm";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerGray from "@/components/ui/containers/ContainerGray";
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

const createNewSingleOffer = async (values: NewSingleOfferFormkikData, base64: string[], venueId:string) => {
  'use server'
  const prisma = new PrismaClient();


  const newSingleOffer = await prisma.singleOffer.create({
    data: {
      venueId: Number(venueId),
      name: values.name,
      description: values.description,
      date: values.date,
      timeStart: values.startTime,
      timeEnd: values.endTime,
    }
  })


  for (let file of base64) {
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(file, {
      folder: "Aletheia",
    });
    await prisma.singleOfferPhoto.create({
      data: {
        singleOfferId: newSingleOffer.id,
        cloudinaryUrl: cloudinaryResponse.secure_url,
        cloudinaryPublicId: cloudinaryResponse.public_id,
      }
    })
  }








  revalidatePath(`/management/${venueId}`)
  redirect(`/management/${venueId}`)
}

const NewSingleEventPage: FC<Props> = (props) => {
  return (
    <ContainerGray>
      <BackLink
        href={`/management/${props.params.venueId}`}
        name="Back to venue"
      />
      <NewSingleOfferForm createNewSingleOffer={createNewSingleOffer} venueId={props.params.venueId}/>
    </ContainerGray>
  );
};

export default NewSingleEventPage;
