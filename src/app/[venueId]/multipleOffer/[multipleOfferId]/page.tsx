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
    multipleOfferId: string;
  };
}

const fetchMultipleOffer = async (multipleOfferId: string) => {
  const prisma = new PrismaClient();
  const multipleOffer = await prisma.multipleOffer.findUnique({
    where: {
      id: Number(multipleOfferId),
    },
    include: {
      multipleOfferPhoto: true,
      venue: {
        include: {
          venuePhotos: true,
        }
      },
    },
  });
  return multipleOffer;
}


const ShowMultipleOfferPage: FC<Props> = async(props) => {
  const multipleOffer = await fetchMultipleOffer(props.params.multipleOfferId);
  const nextDate = getNextOfferDate(
    multipleOffer!.startDate,
    multipleOffer!.endDate,
    {
      onSunday: multipleOffer!.onSunday,
      onMonday: multipleOffer!.onMonday,
      onTuesday: multipleOffer!.onTuesday,
      onWednesday: multipleOffer!.onWednesday,
      onThursday: multipleOffer!.onThursday,
      onFriday: multipleOffer!.onFriday,
      onSaturday: multipleOffer!.onSaturday,
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
        <h1 className="main-header mb-2">{multipleOffer?.name}</h1>
        <ImageCarousel photos={multipleOffer!.multipleOfferPhoto}/>
        <div className="flex my-4">
          <div className="w-full space-y-2">
            <div>
            <p className="paragraph">Location:</p>
            <Link href={`/${props.params.venueId}`} className="small-text line-clamp-1">{multipleOffer?.venue.name}</Link>
            </div>
            <div>
              <p className="paragraph">Offers claimed:</p>
              <p className="small-text">NA</p>
            </div>
          </div>
          <div className="w-full space-y-2">
            <div>
            <p className="paragraph">Next date:</p>
            <p className="small-text">{formatDate}</p>
            </div>
            <div>
              <p className="paragraph">Time:</p>
              <p className="small-text">{multipleOffer?.timeStart} - {multipleOffer?.timeEnd}</p>
            </div>
          </div>
        </div>
        <p className="paragraph">{multipleOffer?.description}</p>
      </div>
      <div className="flex py-2 space-x-2">
        <button className="btn-secondary-wide">SHARE</button>
        <button className="btn-primary-wide">CLAIM</button>
      </div>
      <VenueInfoCard venue={multipleOffer!.venue!}/>
    </ContainerBlack>
  );
};

export default ShowMultipleOfferPage;

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
