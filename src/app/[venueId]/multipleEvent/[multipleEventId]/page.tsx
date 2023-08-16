import VenueInfoCard from "@/components/VenueInfoCard/VenueInfoCard";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerBlack from "@/components/ui/containers/ContainerBlack";
import ImageCarousel from "@/components/ui/image carousel/ImageCarousel";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
    multipleEventId: string;
  };
}

const fetchMultipleEvent = async (multipleEventId: string) => {
  const prisma = new PrismaClient();
  const multipleEvent = await prisma.multipleEvent.findUnique({
    where: {
      id: Number(multipleEventId),
    },
    include: {
      multipleEventPhoto: true,
      venue: {
        include: {
          venuePhotos: true,
        }
      },
    },
  });
  return multipleEvent;
}


const ShowMultipleEventPage: FC<Props> = async(props) => {
  const multipleEvent = await fetchMultipleEvent(props.params.multipleEventId);
  const nextDate = getNextOfferDate(
    multipleEvent!.startDate,
    multipleEvent!.endDate,
    {
      onSunday: multipleEvent!.onSunday,
      onMonday: multipleEvent!.onMonday,
      onTuesday: multipleEvent!.onTuesday,
      onWednesday: multipleEvent!.onWednesday,
      onThursday: multipleEvent!.onThursday,
      onFriday: multipleEvent!.onFriday,
      onSaturday: multipleEvent!.onSaturday,
    }
  );
  const formatDate = nextDate!.toLocaleDateString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  })

  return (
    <ContainerBlack>
      <BackLink href="/home" name="Home" />
      <div className="bg-grayPrimary rounded-md p-4">
        <h1 className="main-header mb-2">{multipleEvent?.name}</h1>
        <ImageCarousel photos={multipleEvent!.multipleEventPhoto}/>
        <div className="flex my-4">
          <div className="w-full space-y-2">
            <div>
            <p className="paragraph">Location:</p>
            <Link href={`/${props.params.venueId}`} className="small-text line-clamp-1">{multipleEvent?.venue.name}</Link>
            </div>
            <div>
              <p className="paragraph">Offers claimed:</p>
              <p className="small-text">x/y</p>
            </div>
          </div>
          <div className="w-full space-y-2">
            <div>
            <p className="paragraph">Next date:</p>
            <p className="small-text">{formatDate}</p>
            </div>
            <div>
              <p className="paragraph">Time:</p>
              <p className="small-text">{multipleEvent?.timeStart} - {multipleEvent?.timeEnd}</p>
            </div>
          </div>
        </div>
        <p className="paragraph">{multipleEvent?.description}</p>
      </div>
      <div className="flex py-2 space-x-2">
        <button className="btn-secondary-wide">SHARE</button>
        <button className="btn-primary-wide">CLAIM</button>
      </div>
      <VenueInfoCard venue={multipleEvent!.venue!}/>
    </ContainerBlack>
  );
};

export default ShowMultipleEventPage;

const getNextOfferDate = (
  startDate: string,
  endDate: string,
  offerDays: any
) => {
  const today = new Date();
  const daysOfWeek = [
    "onSunday",
    "onMonday",
    "onTuesday",
    "onWednesday",
    "onThursday",
    "onFriday",
    "onSaturday",
  ];

  let checkDate = new Date(startDate);

  while (checkDate <= new Date(endDate)) {
    if (offerDays[daysOfWeek[checkDate.getDay()]] && checkDate > today) {
      return checkDate;
    }
    checkDate.setDate(checkDate.getDate() + 1);
  }

  return null;
};
