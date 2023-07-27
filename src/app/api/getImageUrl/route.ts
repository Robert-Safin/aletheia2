import { ImageUrlQuery } from "@/app/components/home page components/VenueCard";
import { Blob } from "buffer";
//import {Client} from "@googlemaps/google-maps-services-js";



export interface ImageUrlResponse {
  message: string;
  errorCode: number;
  base64: string;
}


export async function POST(request: Request) {

  // const body = await request.json() as ImageUrlQuery
  // const reference = body.photoReference
  // if (reference) {
  //   console.log(true);
  // } else {
  //   console.log(false);

  // }



  // const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${reference}&key=${process.env.GOOGLE_MAPS_API_KEY!}`

  // const response = await fetch(url);
  // console.log(response.status);

  // const buffer = await response.arrayBuffer();
  // const base64 = Buffer.from(buffer).toString('base64');











  // return new Response(JSON.stringify({ message: 'ok', errorCode: 0, base64: base64 } as ImageUrlResponse));
}
