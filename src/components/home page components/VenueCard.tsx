import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Place } from "@googlemaps/google-maps-services-js";
import { SecondaryHeader } from "../ui/text elements/Headers";

interface Props {
  venue: Place;
}

export interface ImageUrlQuery {
  photoReference: string;
}

const VenueCard: FC<Props> = (props) => {
  // const [imageUrl, setImageUrl] = useState<any>();

  // useEffect(() => {
  //   const getSingleUrl = async () => {
  //     if (props.venue.photos && props.venue.photos.length > 0) {
  //       const query: ImageUrlQuery = {
  //         photoReference: props.venue.photos[0].photo_reference!,
  //       };
  //       const response = await fetch("/api/getImageUrl", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(query),
  //       });

  //       const url = await response.json() as ImageUrlResponse;
  //       const base64 = url.base64;
  //       const base64ToImage = `data:image/jpeg;base64,${base64}`
  //       setImageUrl(base64ToImage);

  //     } else {
  //       setImageUrl("/madu.webp");
  //     }
  //   };
  //   getSingleUrl();
  // }, [props.venue.photos]);

  // console.log(imageUrl);

  return (
    <>
    {/* <img src={imageUrl!} alt={props.venue.name!} width={500} height={500}/> */}

      <SecondaryHeader title={props.venue.name!} />
    </>
  );
};

export default VenueCard;
