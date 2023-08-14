import RatingToStars from "@/components/ui/icons/RatingToStars";
import {
  MultipleEvent,
  MultipleOffer,
  SingleEvent,
  SingleOffer,
  Venue,
  VenuePhoto,
} from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { Coordinates } from "../HomePageResults";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import Link from "next/link";

interface Props {
  venue: Venue & {
    venuePhotos: VenuePhoto[];
    singleEvents: SingleEvent[];
    multipleEvents: MultipleEvent[];
    singleOffers: SingleOffer[];
    multipleOffers: MultipleOffer[];
  };
  userCoordinates: Coordinates | null;
}

const VenueClose: FC<Props> = (props) => {

    const calculateDistanceFromUser = (userLat: number, userLong: number, venueLat: number, venueLong: number) => {
    const p = 0.017453292519943295;
    const c = Math.cos;
    const a =
      0.5 -
      c((venueLat - userLat) * p) / 2 +
      (c(userLat * p) * c(venueLat * p) * (1 - c((venueLong - userLong) * p))) / 2;

    const distanceInMetres = Math.round(12742 * Math.asin(Math.sqrt(a)) * 1000)
    const distanceInKm = (distanceInMetres / 1000).toFixed(1);
    return distanceInKm + "km";
  };
  const distanceFromUser = calculateDistanceFromUser(
    props.userCoordinates!.latitude,
    props.userCoordinates!.longitude,
    props.venue.latitude,
    props.venue.longitude
  );
  return (
    <div className="flex flex-col space-y-1 w-[140px]">
      <Link href={`/${props.venue.id}`}>
      <Image
        className="img-small"
        src={props.venue.venuePhotos[0].cloudinaryUrl}
        alt={props.venue.name}
        width={1000}
        height={1000}
      />
      </Link>
      <h1 className="secondary-header line-clamp-1">{props.venue.name}</h1>
      <div className="flex items-center justify-between">
        <RatingToStars rating={props.venue.averageRating} />
        <p className="small-text">{distanceFromUser}</p>
      </div>


    <div className="flex items-center space-x-2">
    <BsCalendar2WeekFill className="icon-small"/>
    <p className="small-text">{props.venue.singleEvents.length + props.venue.multipleEvents.length} Upcoming Events</p>
    </div>
    <div className="flex items-center space-x-2">
    <FaTags className="icon-small"/>
    <p className="small-text">{props.venue.singleOffers.length + props.venue.multipleOffers.length} Offers Available</p>
    </div>


    </div>
  );
};

export default VenueClose;
