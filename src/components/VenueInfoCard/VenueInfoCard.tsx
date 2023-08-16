import { Venue, VenuePhoto } from "@prisma/client";
import { FC } from "react";
import RatingToStars from "../ui/icons/RatingToStars";
import ImageCarousel from "../ui/image carousel/ImageCarousel";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";

interface Props {
  venue: Venue & {
    venuePhotos: VenuePhoto[];
  };
}
const VenueInfoCard: FC<Props> = (props) => {
  const formatOpeningHours = props.venue!.openingHours!.split("\n");

  return (
    <div className="bg-grayPrimary rounded-md p-4">
      <h1 className="main-header">Venue</h1>
      <h1 className="main-header my-2">{props.venue.name}</h1>
      <Link
        href={props.venue.googleMapsUrl}
        className="flex items-center space-x-2 mb-2"
      >
        <RatingToStars
          rating={props.venue.averageRating}
          iconClass="icon-large"
        />
        <p className="small-text">{props.venue.totalReviews} Reviews</p>
      </Link>
      <Link href={`/${props.venue.id}`}>
        <ImageCarousel photos={props.venue.venuePhotos} />
      </Link>

      <h2 className="secondary-header mt-4 mb-1">About:</h2>
      <p className="paragraph">
        {props.venue?.description ? props.venue.description : "No description"}
      </p>

      <h2 className="secondary-header mt-4 mb-1">Address:</h2>
      <p className="paragraph">{props.venue?.formattedAdress}</p>

      <h2 className="secondary-header mt-4 mb-1">Phone:</h2>
      <p className="paragraph">{props.venue?.formattedPhoneNumber}</p>

      <h2 className="secondary-header mt-4 mb-1">Website:</h2>
      {props.venue?.website ? (
        <div>
          <Link
            href={props.venue?.website!}
            className="flex space-x-2 items-center"
            target="_blank"
          >
            <HiOutlineExternalLink className="icon-small" />
            <p className="small-text">open link</p>
          </Link>
        </div>
      ) : (
        <p className="paragraph">No website</p>
      )}
      <h2 className="secondary-header mt-4 mb-1">Google page:</h2>

      <Link
        href={props.venue!.googleMapsUrl}
        className="flex space-x-2 items-center"
        target="_blank"
      >
        <HiOutlineExternalLink className="icon-small" />
        <p className="small-text">open link</p>
      </Link>
      <h2 className="secondary-header mt-4 mb-1">Categories:</h2>

      <div className="flex flex-wrap whitespace-nowrap">
        {props.venue?.categories?.split(",").map((category, index) => (
          <p className="category" key={index}>
            {category}
          </p>
        ))}
      </div>
      <h1 className="secondary-header">Hours:</h1>
      <div className="space-y-1">
        {props.venue!.openingHours &&
          formatOpeningHours.map((day, index) => (
            <p className="paragraph" key={index}>
              {day}
            </p>
          ))}
      </div>
    </div>
  );
};

export default VenueInfoCard;
