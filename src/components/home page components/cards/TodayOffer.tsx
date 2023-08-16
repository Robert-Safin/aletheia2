import {
  MultipleEvent,
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

const TodayOffer: FC<Props> = (props) => {

  if ("singleOfferPhoto" in props.offer) {
    if (new Date(props.offer.date).getDate() !== new Date().getDate()) {
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
          alt="event photo"
          width={1000}
          height={1000}
        />
        </Link>
        <h2 className="secondary-header line-clamp-1">{props.offer.name}</h2>
        <p className="paragraph line-clamp-1">{props.venueName}</p>

        <p className="paragraph">
          {props.offer.timeStart} - {props.offer.timeEnd}
        </p>
      </div>
    );
  } else if ("multipleOfferPhoto" in props.offer) {
    const nextEventDate = getNextEventDate(props.offer);
    if (!nextEventDate || nextEventDate.getDate() !== new Date().getDate()) {
      return null;
    }

    return (
      <div className="flex flex-col space-y-1 w-[140px]">
        <Link href={`/${props.venueId}/multipleOffer/${props.offer.id}`}>
        <Image
          className="img-small"
          src={props.offer.multipleOfferPhoto[0].cloudinaryUrl}
          alt="event photo"
          width={1000}
          height={1000}
        />
        </Link>
        <h2 className="secondary-header line-clamp-1">{props.offer.name}</h2>
        <p className="paragraph line-clamp-1">{props.venueName}</p>

        <p className="paragraph">
          {props.offer.timeStart} - {props.offer.timeEnd}
        </p>
      </div>
    );
  }
};

export default TodayOffer;

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
  event: MultipleEvent
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

const getNextEventDate = (event: MultipleEvent): Date | null => {
  let date = new Date();
  date.setUTCHours(0, 0, 0, 0);

  while (
    !isDateInRange(date, event.startDate, event.endDate) ||
    !doesDateMatchDayConstraints(date, event)
  ) {
    date.setUTCDate(date.getUTCDate() + 1);
    if (date > new Date(event.endDate)) return null;
  }

  return date;
};
