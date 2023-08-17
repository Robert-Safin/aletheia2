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
): Promise<Venue> => {
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
  console.log("fetched place data");

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
  console.log("created venue");

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
  console.log("uploaded photos");
  return newVenue;
};

interface multipleEventPayload {
  venueId: number;
  name: string;
  startDate: string;
  endDate: string;
  timeStart: string;
  timeEnd: string;
  description: string;
  onMonday: boolean;
  onTuesday: boolean;
  onWednesday: boolean;
  onThursday: boolean;
  onFriday: boolean;
  onSaturday: boolean;
  onSunday: boolean;
  cloudinaryPublicId: string;
  cloudinaryUrl: string;
}



const seedMultipleEvent = async (data: multipleEventPayload) => {
  await prisma.multipleEvent.create({
    data: {
      venueId: data.venueId,
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      description: data.description,
      onMonday: data.onMonday,
      onTuesday: data.onTuesday,
      onWednesday: data.onWednesday,
      onThursday: data.onThursday,
      onFriday: data.onFriday,
      onSaturday: data.onSaturday,
      onSunday: data.onSunday,
      multipleEventPhoto: {
        create: {
          cloudinaryPublicId: data.cloudinaryPublicId,
          cloudinaryUrl: data.cloudinaryUrl,
        }
      }
    },
  });
};

interface multipleOfferPayload {
  venueId: number;
  name: string;
  startDate: string;
  endDate: string;
  timeStart: string;
  timeEnd: string;
  description: string;
  onMonday: boolean;
  onTuesday: boolean;
  onWednesday: boolean;
  onThursday: boolean;
  onFriday: boolean;
  onSaturday: boolean;
  onSunday: boolean;
  cloudinaryPublicId: string;
  cloudinaryUrl: string;
}

const seedMultipleOffer = async (data: multipleOfferPayload) => {
  await prisma.multipleOffer.create({
    data: {
      venueId: data.venueId,
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      description: data.description,
      onMonday: data.onMonday,
      onTuesday: data.onTuesday,
      onWednesday: data.onWednesday,
      onThursday: data.onThursday,
      onFriday: data.onFriday,
      onSaturday: data.onSaturday,
      onSunday: data.onSunday,
      multipleOfferPhoto: {
        create: {
          cloudinaryPublicId: data.cloudinaryPublicId,
          cloudinaryUrl: data.cloudinaryUrl,
        }
      }
    },
  });
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


















  const oldMans = await seedWithGoolgePlaceId(
    "ChIJ21XBrn040i0Rjf7GPV4so38",
    "user_2TOq6CGfsYBoxEzblWousfo6m6Q",
    "A seaside gathering place with a beer garden, happy hour, and live music."
  );

  await seedMultipleEvent({
    venueId: oldMans.id,
    name: "Beer Pong Tournament",
    startDate: "2021-06-01",
    endDate: "2030-06-30",
    timeStart: "19:00",
    timeEnd: "23:00",
    description: "Gather every Wednesday for a beer pong tournament. 100k entry fee, winner takes all.",
    onMonday: false,
    onTuesday: false,
    onWednesday: true,
    onThursday: false,
    onFriday: false,
    onSaturday: false,
    onSunday: false,
    cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692285962/Aletheia%20seeds/oldman-bali_ixuujo.jpg",
    cloudinaryPublicId: "Aletheia/seeds/oldman-bali_ixuujo.jpg",
  });

  await seedMultipleEvent({
    venueId: oldMans.id,
    name: "Live Music",
    startDate: "2021-06-01",
    endDate: "2030-06-30",
    timeStart: "20:00",
    timeEnd: "23:00",
    description: "Listen to guest DJs and live music every night of the week.",
    onMonday: true,
    onTuesday: true,
    onWednesday: false,
    onThursday: true,
    onFriday: true,
    onSaturday: true,
    onSunday: true,
    cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692285843/Aletheia%20seeds/neon-sign-live-music-with-brick-wall-background-vector_118419-4186_lcxyjl.jpg",
    cloudinaryPublicId: "Aletheia/seeds/neon-sign-live-music-with-brick-wall-background-vector_118419-4186_lcxyjl",
  });



  console.log("Seeded Old Mans");



  const warungGouthe = await seedWithGoolgePlaceId(
    'ChIJKxHGN4I40i0RmzizflQdE1w',
    'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
    'Warung Gouthe is a French restaurant in Canggu, Bali. We serve French food with a twist of Asian flavors. We are open for breakfast, lunch and dinner. We also have a bar with a wide selection of cocktails, wines and beers.'
  )

  await seedMultipleOffer({
    venueId: warungGouthe.id,
    name: "Happy Hour",
    startDate: "2021-06-01",
    endDate: "2030-06-30",
    timeStart: "17:00",
    timeEnd: "19:00",
    description: "Enjoy 2 for 1 cocktails every day from 5pm to 7pm.",
    onMonday: true,
    onTuesday: true,
    onWednesday: true,
    onThursday: true,
    onFriday: true,
    onSaturday: false,
    onSunday: false,
    cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692284513/Aletheia%20seeds/e14835_i5978_s3_hgnxmo.jpg",
    cloudinaryPublicId: "Aletheia/seeds/e14835_i5978_s3_hgnxmo.jpg",
  });

  console.log("Seeded Warung Gouthe");


  const katsuyaLA = await seedWithGoolgePlaceId(
    'ChIJT9BlEjm_woARLHtpZgk_oWE',
    'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
    'Sushi & Japanese small plates are served amid chic decor at this Philippe Starck–designed spot.'
  )

  await seedMultipleOffer({
    venueId: katsuyaLA.id,
    name: "Free Sake",
    startDate: "2021-06-01",
    endDate: "2030-06-30",
    timeStart: "17:00",
    timeEnd: "19:00",
    description: "Enjoy a free glass of sake with every meal.",
    onMonday: false,
    onTuesday: false,
    onWednesday: false,
    onThursday: false,
    onFriday: false,
    onSaturday: true,
    onSunday: true,
    cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692286473/Aletheia%20seeds/manfaat-sake-untuk-kulitjpeg-20211104075322_gsqqx6.jpg",
    cloudinaryPublicId: "Aletheia/seeds/manfaat-sake-untuk-kulitjpeg-20211104075322_gsqqx6.jpg",
    });


  console.log("Seeded Katsuya LA");

    const coquetteBoston = await seedWithGoolgePlaceId(
      'ChIJ3Qi-6hJ744kRWJDoZFSms6U',
      'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
      'Coquette is a French restaurant in Boston, MA. We serve French food with a twist of Asian flavors. We are open for breakfast, lunch and dinner. We also have a bar with a wide selection of cocktails, wines and beers.'
    )

    await seedMultipleOffer({
      venueId: coquetteBoston.id,
      name: "Free appetizer",
      startDate: "2021-06-01",
      endDate: "2030-06-30",
      timeStart: "17:00",
      timeEnd: "19:00",
      description: "Enjoy a free appetizer with every meal.",
      onMonday: true,
      onTuesday: false,
      onWednesday: true,
      onThursday: false,
      onFriday: true,
      onSaturday: false,
      onSunday: true,
      cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692286692/Aletheia%20seeds/escargot-stuffed-mushrooms-recipe-1374828-hero-04-c5827859545a4730b6006e6ead482b43_pn4cjk.jpg",
      cloudinaryPublicId: "Aletheia/seeds/escargot-stuffed-mushrooms-recipe-1374828-hero-04-c5827859545a4730b6006e6ead482b43_pn4cjk.jpg",
      });


    console.log("Seeded Coquette Boston");


      const championBolobanSingapour = await seedWithGoolgePlaceId(
        'ChIJ41qJ4-gZ2jERMAZkYnM0cP4',
        'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
        'Champion Bolo Bun is a Chinese restaurant in Singapore. We serve Chinese food with a twist of Asian flavors. We are open for breakfast, lunch and dinner. We also have a bar with a wide selection of cocktails, wines and beers.'
      )

      await seedMultipleOffer({
        venueId: championBolobanSingapour.id,
        name: "Free dessert",
        startDate: "2021-06-01",
        endDate: "2030-06-30",
        timeStart: "17:00",
        timeEnd: "19:00",
        description: "Enjoy a free dessert with every meal.",
        onMonday: false,
        onTuesday: false,
        onWednesday: false,
        onThursday: false,
        onFriday: false,
        onSaturday: true,
        onSunday: true,
        cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692286819/Aletheia%20seeds/6bc1f7cd-defe-4540-8a90-0c728d2fdd6a_xyrsf5.jpg",
        cloudinaryPublicId: "Aletheia/seeds/6bc1f7cd-defe-4540-8a90-0c728d2fdd6a_xyrsf5.jpg",
        });


      console.log("Seeded Champion Bolo Ban Singapour");

        const manoloSantano = await seedWithGoolgePlaceId(
          'ChIJj9bTENYpcw0RVSvEz0yL1ho',
          'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
          'We offer tennis. padel, swimming and gym facilities. We also have a small cafe where you can enjoy a drink or a snack.'
        )

        await seedMultipleOffer({
          venueId: manoloSantano.id,
          name: "Membership discount",
          startDate: "2021-06-01",
          endDate: "2030-06-30",
          timeStart: "17:00",
          timeEnd: "19:00",
          description: "Enjoy a 10% discount on your membership.",
          onMonday: false,
          onTuesday: false,
          onWednesday: true,
          onThursday: false,
          onFriday: false,
          onSaturday: true,
          onSunday: true,
          cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692287342/Aletheia%20seeds/vrknlx6jfftbfydpwtlq.jpg",
          cloudinaryPublicId: "Aletheia/seeds/vrknlx6jfftbfydpwtlq.jpg",
          });

          await seedMultipleEvent({
            venueId: manoloSantano.id,
            name: "Tennis tournament",
            startDate: "2021-06-01",
            endDate: "2030-06-30",
            timeStart: "17:00",
            timeEnd: "19:00",
            description: "Join our tennis tournament every Saturday. All ages and levels are welcome.",
            onMonday: false,
            onTuesday: false,
            onWednesday: false,
            onThursday: false,
            onFriday: false,
            onSaturday: true,
            onSunday: false,
            cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692287342/Aletheia%20seeds/vrknlx6jfftbfydpwtlq.jpg",
            cloudinaryPublicId: "Aletheia/seeds/vrknlx6jfftbfydpwtlq.jpg",
          })

        console.log("Seeded Manolo Santano");


          const madammeTussauds = await seedWithGoolgePlaceId(
            "ChIJgZ24Us4adkgRpDNAwNPO_SY",
            "user_2TOq6CGfsYBoxEzblWousfo6m6Q",
            "Madame Tussauds is a wax museum in London with smaller museums in a number of other major cities. Madame Tussauds is a major tourist attraction in London, displaying the waxworks of famous and historic people."
          )


          await seedMultipleOffer({
            venueId: madammeTussauds.id,
            name: "Free student entry",
            startDate: "2021-06-01",
            endDate: "2030-06-30",
            timeStart: "17:00",
            timeEnd: "19:00",
            description: "Enjoy a free entry with your student card.",
            onMonday: true,
            onTuesday: true,
            onWednesday: true,
            onThursday: true,
            onFriday: true,
            onSaturday: true,
            onSunday: true,
            cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692287631/Aletheia%20seeds/madame-tussauds_dwayne-the-rock-johnsons-figure-and-guests-image-courtesy-of-madame-tussauds_a35b053fe2ece57aaaa132836a376c2d_rpv063.jpg",
            cloudinaryPublicId: "Aletheia/seeds/madame-tussauds_dwayne-the-rock-johnsons-figure-and-guests-image-courtesy-of-madame-tussauds_a35b053fe2ece57aaaa132836a376c2d_rpv063.jpg",
          })

          console.log("Seeded Madame Tussauds");


          const muscleFactory = await seedWithGoolgePlaceId(
            'ChIJyZnxo2oz5xQRr4copu7xA1g',
            'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
            'Modern gym with a wide range of facilities. We offer a wide range of classes and personal training. We also have a small cafe where you can enjoy a drink or a snack.'
          )

          await seedMultipleOffer({
            venueId: muscleFactory.id,
            name: "Membership discount",
            startDate: "2021-06-01",
            endDate: "2030-06-30",
            timeStart: "00:00",
            timeEnd: "23:59",
            description: "Enjoy a 10% discount on your membership.",
            onMonday: true,
            onTuesday: true,
            onWednesday: true,
            onThursday: true,
            onFriday: true,
            onSaturday: true,
            onSunday: true,
            cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692287842/Aletheia%20seeds/CJb17cX81fwCEAE_iyqruf.png",
            cloudinaryPublicId: "Aletheia/seeds/CJb17cX81fwCEAE_iyqruf.png",
          })


          console.log("Seeded Muscle Factory");


          const louvre = await seedWithGoolgePlaceId(
            'ChIJD3uTd9hx5kcR1IQvGfr8dbk',
            'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
            'The Louvre, or the Louvre Museum, is the world\'s largest art museum and a historic monument in Paris, France, and is best known for being the home of the Mona Lisa.'
          )

          await seedMultipleEvent({
            venueId: louvre.id,
            name: "Ancient Egypt exhibition",
            startDate: "2021-06-01",
            endDate: "2030-06-30",
            timeStart: "00:00",
            timeEnd: "23:59",
            description: "Discover the ancient Egypt with our new exhibition.",
            onMonday: true,
            onTuesday: true,
            onWednesday: true,
            onThursday: true,
            onFriday: true,
            onSaturday: false,
            onSunday: false,
            cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692287986/Aletheia%20seeds/crntruk6axoesnvwnkhd.jpg",
            cloudinaryPublicId: "Aletheia/seeds/crntruk6axoesnvwnkhd.jpg",
          })

          console.log("Seeded Louvre");


          const arpege = await seedWithGoolgePlaceId(
            'ChIJQ-oAFypw5kcR2T9NszPcZO4',
            'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
            'L\'Arpège is a French restaurant in Paris, France. Alain Passard serves as the chef. It has been featured on the list of the world\'s 50 best restaurants from 2002 to 2006 and again in 2008. In 2016, it received three Michelin stars.'
          )

          await seedMultipleEvent({
            venueId: arpege.id,
            name: "Cooking class",
            startDate: "2021-06-01",
            endDate: "2030-06-30",
            timeStart: "12:00",
            timeEnd: "14:00",
            description: "Learn how to cook with our chef.",
            onMonday: false,
            onTuesday: false,
            onWednesday: false,
            onThursday: false,
            onFriday: true,
            onSaturday: false,
            onSunday: false,
            cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692288144/Aletheia%20seeds/b1cdfc1c-c429-4963-9b81-46cab0cc61fc_y5nivf.jpg",
            cloudinaryPublicId: "Aletheia/seeds/b1cdfc1c-c429-4963-9b81-46cab0cc61fc_y5nivf.jpg",
          })

          console.log("Seeded Arpege");

          const freundschaft = await seedWithGoolgePlaceId(
            'ChIJJeeduzpRqEcRpVSSiay50C0',
            'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
            'Freundschaft is a German restaurant in Berlin, Germany. It has been featured on the list of the world\'s 50 best restaurants from 2002 to 2006 and again in 2008. In 2016, it received three Michelin stars.'
          )

          await seedMultipleOffer({
            venueId: freundschaft.id,
            name: "Free drink",
            startDate: "2021-06-01",
            endDate: "2030-06-30",
            timeStart: "12:00",
            timeEnd: "14:00",
            description: "Enjoy a free drink with your meal.",
            onMonday: false,
            onTuesday: true,
            onWednesday: false,
            onThursday: false,
            onFriday: false,
            onSaturday: false,
            onSunday: false,
            cloudinaryUrl: 'https://res.cloudinary.com/dxgkclowd/image/upload/v1692288344/Aletheia%20seeds/non-alcoholic-drink-2048px-0409_oggmcg.jpg',
            cloudinaryPublicId: 'Aletheia/seeds/non-alcoholic-drink-2048px-0409_oggmcg.jpg',
          })

          console.log("Seeded Freundschaft");

          const prado = await seedWithGoolgePlaceId(
            'ChIJ7aLYZp0oQg0RWoitk33wlBA',
            'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
            'The Prado Museum is the main Spanish national art museum, located in central Madrid. It is widely considered to have one of the world\'s finest collections of European art, dating from the 12th century to the early 20th century, based on the former Spanish Royal Collection, and the single best collection of Spanish art.'
          )

          await seedMultipleEvent({
            venueId: prado.id,
            name: "Picasso exhibition",
            startDate: "2021-06-01",
            endDate: "2030-06-30",
            timeStart: "12:00",
            timeEnd: "19:30",
            description: "Discover the Picasso\'s work with our new exhibition.",
            onMonday: true,
            onTuesday: true,
            onWednesday: true,
            onThursday: true,
            onFriday: true,
            onSaturday: false,
            onSunday: false,
            cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692291252/Aletheia%20seeds/Artist_Thumbnail_-__0004_PICASSO_b1073_jacqueline_in_a_straw_hat_lipic1073sc_un1_pnl80c.jpg",
            cloudinaryPublicId: "Aletheia/seeds/Artist_Thumbnail_-__0004_PICASSO_b1073_jacqueline_in_a_straw_hat_lipic1073sc_un1_pnl80c.jpg",
          })

          console.log("Seeded Prado");


          const dubaiOpera = await seedWithGoolgePlaceId(
            'ChIJkdkorypoXz4RY_9KOq__Vcg',
            'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
            'Dubai Opera is a 2,000-seat, multi-format, performing arts centre, which is located within The Opera District in Downtown Dubai. It was developed by Emaar Properties to host a variety of performances and events including theatre, opera, ballet, concerts, conferences and exhibitions.'
          )

          await seedMultipleOffer({
            venueId: dubaiOpera.id,
            name: "Phantom of the Opera",
            startDate: "2021-06-01",
            endDate: "2030-06-30",
            timeStart: "12:00",
            timeEnd: "15:30",
            description: "Enjoy the Phantom of the Opera with our new offer this Friday.",
            onMonday: false,
            onTuesday: false,
            onWednesday: false,
            onThursday: false,
            onFriday: true,
            onSaturday: false,
            onSunday: false,
            cloudinaryUrl: 'https://res.cloudinary.com/dxgkclowd/image/upload/v1692291517/Aletheia%20seeds/c2_wejuob.jpg',
            cloudinaryPublicId: 'Aletheia/seeds/c2_wejuob.jpg',
          })

          console.log("Seeded Dubai Opera");


          // const soupCurryGaraku = await seedWithGoolgePlaceId(
          //   'hIJQ21rhoMpC18RmzhfndITzug',
          //   'user_2TOq6CGfsYBoxEzblWousfo6m6Q',
          //   'Soup Curry Garaku is a Japanese restaurant in Sapporo, Japan. It has been featured on the list of the world\'s 50 best restaurants from 2002 to 2006 and again in 2008. In 2016, it received three Michelin stars.'
          // )

          // await seedMultipleEvent({
          //   venueId: soupCurryGaraku.id,
          //   name: "Soup Curry Festival",
          //   startDate: "2021-06-01",
          //   endDate: "2030-06-30",
          //   timeStart: "12:00",
          //   timeEnd: "19:30",
          //   description: "Discover the Soup Curry Festival with our new event.",
          //   onMonday: true,
          //   onTuesday: false,
          //   onWednesday: false,
          //   onThursday: false,
          //   onFriday: false,
          //   onSaturday: false,
          //   onSunday: false,
          //   cloudinaryUrl: "https://res.cloudinary.com/dxgkclowd/image/upload/v1692291656/Aletheia%20seeds/s_0n5d_rjmdqu.jpg",
          //   cloudinaryPublicId: "Aletheia/seeds/s_0n5d_rjmdqu.jpg",
          // })


          // console.log("Seeded Soup Curry Garaku");













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
