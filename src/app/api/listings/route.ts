import { ImageUrlQuery } from "@/app/components/home page components/VenueCard";
import { Blob } from "buffer";
import {Client} from "@googlemaps/google-maps-services-js";


const companyProfileId = '4379279419338407581'
const pid = "ChIJyZ5k81PXcg0RkuB2loZZwzI"
const userId = "113847325133023374455"



// const fetchGoogleMyBusinessListings = async (accessToken:string) => {
//   const baseUrl = `https://mybusinessaccountmanagement.googleapis.com/v1/accounts`;

//   const response = await fetch(baseUrl, {
//     method: 'GET',
//     headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Accept': 'application/json',
//     }
//   });

//   console.log(await response.text());

// }


const test = async () => {

}




export async function POST(request: Request) {

  const body = await request.json()
  const accessToken = body.accessToken
  //const locations = await fetchGoogleMyBusinessListings(accessToken)










  // return new Response(JSON.stringify({ message: 'ok', errorCode: 0, base64: base64 } as ImageUrlResponse));
}
