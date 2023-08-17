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
    if (
      !isTodayInRange(props.offer.startDate, props.offer.endDate) ||
      !isOfferToday(props.offer)
    ) {
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
