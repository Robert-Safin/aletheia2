import { Coordinates, HomePageSearchParams } from "@/app/home/page";
import {Client} from "@googlemaps/google-maps-services-js";

import { Place } from "@googlemaps/google-maps-services-js";



export interface HomePageResponse {
  message: string;
  errorCode: number;
  venues: Place[];
}



export async function POST(request: Request) {

  const body = await request.json() as HomePageSearchParams

  const lat = body.coordinates.latitude
  const lng = body.coordinates.longitude
  const radius = body.radius
  const type = body.type

  const client = new Client({});

  const searchQuery = await client
        .placesNearby({
          params: {
            location: `${lat},${lng}`,
            radius: radius,
            type: type,
            key: process.env.GOOGLE_MAPS_API_KEY!,

          },
        })

  const venues = searchQuery.data.results



  return new Response(JSON.stringify({ message: "ok", errorCode: 0 , venues: venues} as HomePageResponse));
}
