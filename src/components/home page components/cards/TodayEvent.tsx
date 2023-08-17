import {
  MultipleEvent,
  MultipleEventPhoto,
  SingleEvent,
  SingleEventPhoto,
} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  event:
    | (SingleEvent & {
        singleEventPhoto: SingleEventPhoto[];
      })
    | (MultipleEvent & {
        multipleEventPhoto: MultipleEventPhoto[];
      });
  venueName: string;
  venueId: number;
}

const TodayEvent: FC<Props> = (props) => {
  if ("singleEventPhoto" in props.event) {
    if (new Date(props.event.date).getDate() !== new Date().getDate()) {
      return null;
    }

    const formatDate = new Date(props.event.date).toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    });
    return (
      <div className="flex flex-col space-y-1 w-[140px]">
        <Link href={`/${props.venueId}/singleEvent/${props.event.id}`}>
          <Image
            className="img-small"
            src={props.event.singleEventPhoto[0].cloudinaryUrl}
            alt="event photo"
            width={1000}
            height={1000}
          />
        </Link>
        <h2 className="secondary-header line-clamp-1">{props.event.name}</h2>
        <p className="paragraph line-clamp-1">{props.venueName}</p>

        <p className="paragraph">
          {props.event.timeStart} - {props.event.timeEnd}
        </p>
      </div>
    );
  } else if ("multipleEventPhoto" in props.event) {
    if (
      !isTodayInRange(props.event.startDate, props.event.endDate) ||
      !isOfferToday(props.event)
    ) {
      return null;
    }

    return (
      <div className="flex flex-col space-y-1 w-[140px]">
        <Link href={`/${props.venueId}/multipleEvent/${props.event.id}`}>
          <Image
            className="img-small"
            src={props.event.multipleEventPhoto[0].cloudinaryUrl}
            alt="event photo"
            width={1000}
            height={1000}
          />
        </Link>
        <h2 className="secondary-header line-clamp-1">{props.event.name}</h2>
        <p className="paragraph line-clamp-1">{props.venueName}</p>

        <p className="paragraph">
          {props.event.timeStart} - {props.event.timeEnd}
        </p>
      </div>
    );
  }
};

export default TodayEvent;

const isTodayInRange = (startDate: string, endDate: string): boolean => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return today >= start && today <= end;
};

const isOfferToday = (offer: MultipleEvent): boolean => {
  const dayOfWeek = new Date().getUTCDay();
  switch (dayOfWeek) {
    case 0:
      return offer.onSunday;
    case 1:
      return offer.onMonday;
    case 2:
      return offer.onTuesday;
    case 3:
      return offer.onWednesday;
    case 4:
      return offer.onThursday;
    case 5:
      return offer.onFriday;
    case 6:
      return offer.onSaturday;
    default:
      return false;
  }
};
