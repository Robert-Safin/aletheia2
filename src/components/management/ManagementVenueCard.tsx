import { VenuePhoto, Venue, SingleEvent, MultipleEvent, SingleOffer, MultipleOffer } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import RatingToStars from "../ui/icons/RatingToStars";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import Link from "next/link";
import ImageCarousel from "../ui/image carousel/ImageCarousel";

interface Props {
  venue: Venue & {
    venuePhotos: VenuePhoto[];

    singleEvents: SingleEvent[];
    multipleEvents: MultipleEvent[];

    singleOffers: SingleOffer[];
    multipleOffers: MultipleOffer[];
  };
}

const VenueManagementCard: FC<Props> = async (props) => {
  return (
    <div className="bg-grayPrimary container mx-auto">
      <ImageCarousel photos={props.venue.venuePhotos} />

      <h2 className="secondary-header mb-2">{props.venue.name}</h2>
      <div className="flex items-center">
        <RatingToStars rating={props.venue.averageRating} iconClass="icon-small"/>
        <Link
          href={props.venue.googleMapsUrl}
          target="_blank"
          className="small-text ml-2"
        >
          {props.venue.totalReviews} reviews
        </Link>
      </div>

      <div className="flex space-x-4 mt-1">
        <div className="flex space-x-2 items-center">
          <BsCalendar2WeekFill className="icon-small" />
          <p className="small-text">
            {props.venue.singleEvents.length +
              props.venue.multipleEvents.length}{" "}
            events
          </p>
        </div>
        <div className="flex space-x-2 items-center">
          <FaTags className="icon-small" />
          <p className="small-text">
            {props.venue.singleOffers.length +
              props.venue.multipleOffers.length}{" "}
            offers
          </p>
        </div>
      </div>
      <Link href={`/management/${props.venue.id}`}>
        <button className="btn-primary-wide my-4">
          VIEW VENUE INFORMATION
        </button>
      </Link>
    </div>
  );
};

export default VenueManagementCard;
