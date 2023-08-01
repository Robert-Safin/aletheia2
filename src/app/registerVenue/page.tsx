import RegisterVenueForm from "@/components/forms/RegisterVenueForm";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import { MainHeader } from "@/components/ui/text elements/Headers";
import { Place } from "@googlemaps/google-maps-services-js";
import { FC } from "react";
import { Buffer } from 'buffer';
import ContainerBlack from "@/components/ui/containers/ContainerBlack";



const RegisterVenuePage: FC = async() => {

  const findListingOnGoogle = async(placeId:string) => {
    'use server'
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`)

    const data = await response.json()
    const placeData = data.result as Place

    const firstPhotoReference = placeData.photos![0].photo_reference
    const photoResponse = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${firstPhotoReference}&key=${process.env.GOOGLE_MAPS_API_KEY}`)


    const photoBuffer = await photoResponse.arrayBuffer();
    const base64Photo = Buffer.from(photoBuffer).toString('base64');
    placeData.photos![0].photo_reference = `data:image/jpeg;base64,${base64Photo}`;


    return placeData;
  }


  return (
    <ContainerBlack>
      <MainHeader title="Register your venue" />

      <RegisterVenueForm  findListingOnGoogle={findListingOnGoogle}/>

    </ContainerBlack>
  );
};

export default RegisterVenuePage;
