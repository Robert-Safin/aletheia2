import RegisterVenueForm from "@/components/forms/RegisterVenueForm";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import { Place } from "@googlemaps/google-maps-services-js";
import { FC } from "react";
import { Buffer } from "buffer";
import ContainerBlack from "@/components/ui/containers/ContainerBlack";
import { PrismaClient, Venue } from "@prisma/client";
import cloudinary from "cloudinary";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface GooglePlaceError {
  error_message: string;
}

const RegisterVenuePage: FC = async () => {
  const user = await currentUser();

  const findListingOnGoogle = async (placeId: string) => {
    "use server";
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    const data = await response.json();
    const placeData = data.result as Place;

    if (!placeData) {
      const gogglePlaceError = {
        error_message: "Place ID not found",
      };
      return gogglePlaceError as GooglePlaceError;
    }

    const prisma = new PrismaClient();
    const existingVenue = await prisma.venue.findFirst({
      where: {
        googlePlaceId: placeData.place_id!,
      }
    })
    prisma.$disconnect();

    if (existingVenue) {
      const gogglePlaceError = {
        error_message: "Venue already exists",
      };
      return gogglePlaceError as GooglePlaceError;
    }

    const firstPhotoReference = placeData.photos![0].photo_reference;
    const photoResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${firstPhotoReference}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    const photoBuffer = await photoResponse.arrayBuffer();
    const base64Photo = Buffer.from(photoBuffer).toString("base64");
    placeData.photos![0].photo_reference = base64Photo;

    return placeData;
  };

  const createVenue = async (venue: Place) => {
    "use server";
    const buffer = Buffer.from(venue.photos![0].photo_reference, "base64");
    const dataURL = `data:image/jpeg;base64,${buffer.toString("base64")}`;

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(dataURL, {
      folder: "Aletheia",
    });

    if (cloudinaryResponse) {
      const prisma = new PrismaClient();
      const newVenue = await prisma.venue.create({
        data: {
          name: venue.name!,
          googlePlaceId: venue.place_id!,
          description: null,
          formattedAdress: venue.formatted_address!,
          formattedPhoneNumber: venue.formatted_phone_number!,
          website: venue.website!,
          googleMapsUrl: venue.url!,
          openingHours: venue.opening_hours!.weekday_text!.join("\n"),
          categories: venue.types!.join(","),
          averageRating: venue.rating!,
          totalReviews: venue.user_ratings_total!,
          latitude: venue.geometry!.location.lat!,
          longitude: venue.geometry!.location.lng!,
          clerkId: user!.id,
          photos: {
            create: {
              cloudinaryUrl: cloudinaryResponse.secure_url,
              cloudinaryPublicId: cloudinaryResponse.public_id,
            },
          },
        },
      });
      prisma.$disconnect();
      revalidateTag("/management");
      //revalidatePath("/management");
      redirect("/management");
    }
  };

  return (
    <ContainerBlack>
      <RegisterVenueForm
        findListingOnGoogle={findListingOnGoogle}
        createVenue={createVenue}
      />
    </ContainerBlack>
  );
};

export default RegisterVenuePage;
