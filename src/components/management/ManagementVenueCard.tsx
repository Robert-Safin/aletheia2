import { Photo, Venue } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import RatingToStars from "../ui/icons/RatingToStars";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import Link from "next/link";

interface Props {
  venue: Venue & {
    photos: Photo[];
  };
}

const VenueManagementCard: FC<Props> = async (props) => {
  return (
    <div className="bg-grayPrimary container mx-auto">
      <Image
        src={props.venue.photos[0].cloudinaryUrl}
        alt="Venue Image"
        width={1000}
        height={10000}
        className="img-large"
      />

      <h2 className="secondary-header mb-2">{props.venue.name}</h2>
      <div className="flex items-center">
        <RatingToStars rating={props.venue.averageRating} />
        <p className="small-text ml-2">{props.venue.totalReviews} reviews</p>
      </div>

      <div className="flex space-x-4 mt-1">
        <div className="flex space-x-2 items-center">
          <BsCalendar2WeekFill className="icon-small"/>
          <p className="small-text">x events</p>
        </div>
        <div className="flex space-x-2 items-center">
          <FaTags className="icon-small"/>
          <p className="small-text">x offers</p>
        </div>
      </div>
      <Link href={`/management/${props.venue.id}`}>
      <button className="btn-primary-wide my-4">VIEW VENUE INFORMATION</button>
      </Link>
    </div>
  );
};

export default VenueManagementCard;
