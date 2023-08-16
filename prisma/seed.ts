

import { Client, Place } from "@googlemaps/google-maps-services-js";
import { PrismaClient, Venue, VenuePayload } from "@prisma/client";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const prisma = new PrismaClient();
const mapsClient = new Client({});

const seedWithGoolgePlaceId = async (
  placeId: string,
  clerkId: string,
  venueDescription: string
) => {
  console.log("starting seed");

  //fetch venue from google
  const placeDetails = await mapsClient.placeDetails({
    params: {
      place_id: placeId,
      key: process.env.GOOGLE_MAPS_API_KEY!,
    },
    timeout: 1000, // milliseconds
  });
  const placeData = placeDetails.data.result as Place;
  console.log('fetched place data');

  //create venue
  const newVenue = await prisma.venue.create({
    data: {
      clerkId: clerkId,
      name: placeData.name!,
      formattedAdress: placeData.formatted_address!,
      formattedPhoneNumber: placeData.formatted_phone_number!,
      googlePlaceId: placeData.place_id!,
      latitude: placeData.geometry!.location.lat,
      longitude: placeData.geometry!.location.lng,
      website: placeData.website!,
      description: venueDescription,
      openingHours: placeData.opening_hours!.weekday_text!.join("\n"),
      averageRating: placeData.rating!,
      totalReviews: placeData.user_ratings_total!,
      categories: placeData.types!.join(","),
      googleMapsUrl: placeData.url!,
    },
  });
  console.log('created venue');


  //select first 5 photos
  const fivePhotoReferences = placeData
    .photos!.slice(0, 5)
    .map((photo) => photo.photo_reference);

  //upload photos to cloudinary & create venuePhotos
  for (let ref of fivePhotoReferences) {

    const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(imageUrl, {
      folder: "Aletheia",
    });

    await prisma.venuePhoto.create({
      data: {
        venueId: newVenue.id,
        cloudinaryPublicId: cloudinaryResponse.public_id,
        cloudinaryUrl: cloudinaryResponse.secure_url,
      },
    });
  }
  console.log('uploaded photos');

};

async function main() {
  await prisma.singleEventPhoto.deleteMany({});
  await prisma.singleEvent.deleteMany({});

  await prisma.singleOfferPhoto.deleteMany({});
  await prisma.singleOffer.deleteMany({});

  await prisma.multipleEventPhoto.deleteMany({});
  await prisma.multipleEvent.deleteMany({});

  await prisma.multipleOfferPhoto.deleteMany({});
  await prisma.multipleOffer.deleteMany({});

  await prisma.venuePhoto.deleteMany({});
  await prisma.venue.deleteMany({});

  await seedWithGoolgePlaceId(
    "ChIJv-pCBGtH0i0RtjgHkk_uF-g",
    "user_2TOq6CGfsYBoxEzblWousfo6m6Q",
    "The best place to eat in town!"
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
