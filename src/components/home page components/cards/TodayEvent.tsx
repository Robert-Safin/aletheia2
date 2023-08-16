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
    const nextEventDate = getNextEventDate(props.event);
    if (!nextEventDate || nextEventDate.getDate() !== new Date().getDate()) {
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
