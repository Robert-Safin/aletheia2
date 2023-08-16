import {
  MultipleOffer,
  MultipleOfferPhoto,
  SingleOffer,
  SingleOfferPhoto,
} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  offer:
    | (SingleOffer & {
        singleOfferPhoto: SingleOfferPhoto[];
      })
    | (MultipleOffer & {
        multipleOfferPhoto: MultipleOfferPhoto[];
      });
  venueName: string;
  venueId: number;
}

const UpcomingOffer: FC<Props> = (props) => {
  if ("singleOfferPhoto" in props.offer) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const offerDate = new Date(props.offer.date);
    offerDate.setHours(0, 0, 0, 0);

    if (offerDate <= today) {
      return null;
    }
    const formatDate = new Date(props.offer.date).toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    });
    return (
      <div className="flex flex-col space-y-1 w-[140px]">
        <Link href={`/${props.venueId}/singleOffer/${props.offer.id}`}>
        <Image
          className="img-small"
          src={props.offer.singleOfferPhoto[0].cloudinaryUrl}
          alt="offer photo"
          width={1000}
          height={1000}
        />
        </Link>
        <h2 className="secondary-header line-clamp-1">{props.offer.name}</h2>
        <p className="paragraph">{props.venueName}</p>
        <p className="small-text">{formatDate}, {props.offer.timeStart}</p>
      </div>
    );
  } else if ("multipleOfferPhoto" in props.offer) {
    const nextEventDate = getNextEventDate(props.offer);

    if (!nextEventDate) {
      return null;
    }
    return (
      <div className="flex flex-col space-y-1 w-[140px]">
        <Link href={`/${props.venueId}/multipleOffer/${props.offer.id}`}>
        <Image
          className="img-small"
          src={props.offer.multipleOfferPhoto[0].cloudinaryUrl}
          alt="offer photo"
          width={1000}
          height={1000}
        />
        </Link>
        <h2 className="secondary-header line-clamp-1">{props.offer.name}</h2>
        <p className="paragraph">{props.venueName}</p>
        <p className="small-text">
          {nextEventDate.toLocaleDateString("en-GB", {
            month: "short",
            day: "numeric",
          })}, {props.offer.timeStart}
        </p>
      </div>
    );
  }
};

export default UpcomingOffer;

const isDateInRange = (
  date: Date,
  startDate: string,
  endDate: string
): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return date >= start && date <= end;
};

const doesDateMatchDayConstraints = (
  date: Date,
  event: MultipleOffer
): boolean => {
  const dayOfWeek = date.getUTCDay();
  switch (dayOfWeek) {
    case 0:
      return event.onSunday;
    case 1:
      return event.onMonday;
    case 2:
      return event.onTuesday;
    case 3:
      return event.onWednesday;
    case 4:
      return event.onThursday;
    case 5:
      return event.onFriday;
    case 6:
      return event.onSaturday;
    default:
      return false;
  }
};

const getNextEventDate = (event: MultipleOffer): Date | null => {
  let date = new Date();
  date.setUTCHours(0, 0, 0, 0);

  date.setUTCDate(date.getUTCDate() + 1);

  while (
    !isDateInRange(date, event.startDate, event.endDate) ||
    !doesDateMatchDayConstraints(date, event)
  ) {
    date.setUTCDate(date.getUTCDate() + 1);
    if (date > new Date(event.endDate)) return null;
  }

  return date;
};
