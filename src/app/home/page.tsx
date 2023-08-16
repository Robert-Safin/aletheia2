import { Place } from "@googlemaps/google-maps-services-js";
import ContainerBlack from "../../components/ui/containers/ContainerBlack";

import HomePageResults, {
  SearchParams,
} from "@/components/home page components/HomePageResults";
import { PrismaClient } from "@prisma/client";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

const initialSearch = async (
  coordinates: Coordinates,
  searchParams: SearchParams
) => {
  "use server";


  const maxLatitute = coordinates.latitude + (searchParams.distanceKm / 111.32);
  const minLatitute = coordinates.latitude - (searchParams.distanceKm / 111.32);

  const maxLongitude = coordinates.longitude + (searchParams.distanceKm / 111.32);
  const minLongitude = coordinates.longitude - (searchParams.distanceKm / 111.32);

  const prisma = new PrismaClient();
  const venues = await prisma.venue.findMany({
    where: {
      latitude: {
        lte: maxLatitute,
        gte: minLatitute,
      },
      longitude: {
        lte: maxLongitude,
        gte: minLongitude,
      },
      AND: {
        name: {
          contains: searchParams.searchTerm,
        },
      },
    },
    include: {
      venuePhotos: true,
      singleEvents: {
        include: {
          singleEventPhoto: true,
        },
      },
      multipleEvents: {
        include: {
          multipleEventPhoto: true,
        },
      },
      singleOffers: {
        include: {
          singleOfferPhoto: true,
        },
      },
      multipleOffers: {
        include: {
          multipleOfferPhoto: true,
        },
      },
    },
  });
  await prisma.$disconnect();

  return venues;

};


const HomePage = async () => {
  return (
    <ContainerBlack>
      <HomePageResults initialSearch={initialSearch} />
    </ContainerBlack>
  );
};

export default HomePage;
