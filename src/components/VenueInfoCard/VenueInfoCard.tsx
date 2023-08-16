import { Venue, VenuePhoto } from "@prisma/client";
import { FC } from "react";
import RatingToStars from "../ui/icons/RatingToStars";
import ImageCarousel from "../ui/image carousel/ImageCarousel";
import Link from "next/link";

interface Props {
  venue: Venue & {
    venuePhotos: VenuePhoto[];
  };
}
const VenueInfoCard: FC<Props> = (props) => {
  return (
    <div className="bg-grayPrimary rounded-md p-4">
      <h1 className="main-header">Venue</h1>
      <h1 className="main-header my-2">{props.venue.name}</h1>
      <Link href={props.venue.googleMapsUrl} className="flex items-center space-x-2 mb-2">
        <RatingToStars
          rating={props.venue.averageRating}
          iconClass="icon-large"
        />
        <p className="small-text">{props.venue.totalReviews} Reviews</p>
      </Link>
      <Link href={`/${props.venue.id}`}>
        <ImageCarousel photos={props.venue.venuePhotos} />
      </Link>
      <h2 className="secondary-header">About venue:</h2>
      <p className="paragraph">{props.venue.description}</p>
      <div className="flex flex-wrap">
        {props.venue.categories?.split(",").map((category, index) => (
          <p className="category" key={index}>
            {category}
          </p>
        ))}
      </div>
    </div>
  );
};

export default VenueInfoCard;
