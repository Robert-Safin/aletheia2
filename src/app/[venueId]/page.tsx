import XScrollContainer from "@/components/home page components/XScrollContainer";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerBlack from "@/components/ui/containers/ContainerBlack";
import RatingToStars from "@/components/ui/icons/RatingToStars";
import ImageCarousel from "@/components/ui/image carousel/ImageCarousel";
import { MultipleEvent, PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import { HiOutlineExternalLink, HiOutlineTag } from "react-icons/hi";

interface Props {
  params: {
    venueId: string;
  };
}

const fetchVenue = async (venueId: string) => {
  const prisma = new PrismaClient();
  const venue = await prisma.venue.findUnique({
    where: {
      id: Number(venueId),
    },
    include: {
      venuePhotos: true,
      singleEvents: {
        include: {
          singleEventPhoto: true,
        },
      },
      multipleEvents: {
        include: {
          multipleEventPhoto: true,
        },
      },
      singleOffers: {
        include: {
          singleOfferPhoto: true,
        },
      },
      multipleOffers: {
        include: {
          multipleOfferPhoto: true,
        },
      },
    },
  });
  await prisma.$disconnect();
  return venue;
};

const VenuePage: FC<Props> = async (props) => {
  const venue = await fetchVenue(props.params.venueId);
  const formatOpeningHours = venue!.openingHours!.split("\n");
  const allEvents = [...venue!.singleEvents, ...venue!.multipleEvents];
  const allOffers = [...venue!.singleOffers, ...venue!.multipleOffers];

  return (
    <ContainerBlack>
      <BackLink href="/home" name="Home" />
      <div className="container bg-grayPrimary p-4 rounded-md">
        <h1 className="main-header mt-2">{venue!.name}</h1>
        <ImageCarousel photos={venue!.venuePhotos} />
        <div className="flex items-center mt-2 mb-1">
          <RatingToStars rating={venue!.averageRating} iconClass="icon-large" />
          <Link
            href={venue!.googleMapsUrl}
            target="_blank"
            className="small-text ml-2"
          >
            {venue?.totalReviews} reviews
          </Link>
        </div>

        <h2 className="secondary-header mt-4 mb-1">About:</h2>
        <p className="paragraph">
          {venue?.description ? venue.description : "No description"}
        </p>

        <h2 className="secondary-header mt-4 mb-1">Address:</h2>
        <p className="paragraph">{venue?.formattedAdress}</p>

        <h2 className="secondary-header mt-4 mb-1">Phone:</h2>
        <p className="paragraph">{venue?.formattedPhoneNumber}</p>

        <h2 className="secondary-header mt-4 mb-1">Website:</h2>
        {venue?.website ? (
          <div>
            <Link
              href={venue?.website!}
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
          href={venue!.googleMapsUrl}
          className="flex space-x-2 items-center"
          target="_blank"
        >
          <HiOutlineExternalLink className="icon-small" />
          <p className="small-text">open link</p>
        </Link>
        <h2 className="secondary-header mt-4 mb-1">Categories:</h2>

        <div className="flex flex-wrap whitespace-nowrap">
          {venue?.categories?.split(",").map((category, index) => (
            <p className="category" key={index}>
              {category}
            </p>
          ))}
        </div>
        <h1 className="secondary-header">Hours:</h1>
        <div className="space-y-1">
          {venue!.openingHours &&
            formatOpeningHours.map((day, index) => (
              <p className="paragraph" key={index}>
                {day}
              </p>
            ))}
        </div>
      </div>
      <div className="container bg-grayPrimary p-4 rounded-md mt-2">
        <div className="flex space-x-2 items-center">
          <XScrollContainer
            category="Offers"
            icon={<HiOutlineTag className="icon-large" />}
          >
            {allOffers.map((offer, index) =>
              "singleOfferPhoto" in offer ? (
                <div className="flex flex-col w-[140px]" key={index}>
                  <Link
                    href={`/${props.params.venueId}/singleOffer/${offer.id}`}
                  >
                    <Image
                      className="img-small"
                      alt="offer photo"
                      src={offer.singleOfferPhoto[0].cloudinaryUrl}
                      width={1000}
                      height={1000}
                    />
                  </Link>
                  <h2 className="secondary-header line-clamp-1">
                    {offer.name}
                  </h2>
                  <p className="small-text">
                    {new Date(offer.date).toLocaleDateString("en-GB", {
                      month: "short",
                      day: "numeric",
                    })}
                    , {offer.timeStart} - {offer.timeEnd}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col w-[140px]" key={index}>
                  <Link
                    href={`/${props.params.venueId}/multipleOffer/${offer.id}`}
                  >
                    <Image
                      className="img-small"
                      alt="offer photo"
                      src={offer.multipleOfferPhoto[0].cloudinaryUrl}
                      width={1000}
                      height={1000}
                    />
                  </Link>
                  <h2 className="secondary-header line-clamp-1">
                    {offer.name}
                  </h2>
                  <p className="small-text">
                    {(() => {
                      const nextDate = getNextOfferDate(
                        offer.startDate,
                        offer.endDate,
                        {
                          onSunday: offer.onSunday,
                          onMonday: offer.onMonday,
                          onTuesday: offer.onTuesday,
                          onWednesday: offer.onWednesday,
                          onThursday: offer.onThursday,
                          onFriday: offer.onFriday,
                          onSaturday: offer.onSaturday,
                        }
                      );

                      return nextDate
                        ? nextDate.toLocaleDateString("en-GB", {
                            month: "short",
                            day: "numeric",
                          })
                        : "No upcoming dates";
                    })()}
                    , {offer.timeStart} - {offer.timeEnd}
                  </p>
                </div>
              )
            )}
          </XScrollContainer>
        </div>
        <div className="flex space-x-2 items-center">
          <XScrollContainer
            category="Events"
            icon={<AiOutlineCalendar className="icon-large" />}
          >
            {allEvents.map((event, index) =>
              "singleEventPhoto" in event ? (
                <div className="flex flex-col w-[140px]" key={index}>
                  <Link
                    href={`/${props.params.venueId}/singleEvent/${event.id}`}
                  >
                    <Image
                      className="img-small"
                      alt="offer photo"
                      src={event.singleEventPhoto[0].cloudinaryUrl}
                      width={1000}
                      height={1000}
                    />
                  </Link>
                  <h2 className="secondary-header line-clamp-1">
                    {event.name}
                  </h2>
                  <p className="small-text">
                    {new Date(event.date).toLocaleDateString("en-GB", {
                      month: "short",
                      day: "numeric",
                    })}
                    , {event.timeStart} - {event.timeEnd}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col w-[140px]" key={index}>
                  <Link
                    href={`/${props.params.venueId}/multipleEvent/${event.id}`}
                  >
                    <Image
                      className="img-small"
                      alt="offer photo"
                      src={event.multipleEventPhoto[0].cloudinaryUrl}
                      width={1000}
                      height={1000}
                    />
                  </Link>
                  <h2 className="secondary-header line-clamp-1">
                    {event.name}
                  </h2>
                  <p className="small-text">
                    {(() => {
                      const nextDate = getNextOfferDate(
                        event.startDate,
                        event.endDate,
                        {
                          onSunday: event.onSunday,
                          onMonday: event.onMonday,
                          onTuesday: event.onTuesday,
                          onWednesday: event.onWednesday,
                          onThursday: event.onThursday,
                          onFriday: event.onFriday,
                          onSaturday: event.onSaturday,
                        }
                      );

                      return nextDate
                        ? nextDate.toLocaleDateString("en-GB", {
                            month: "short",
                            day: "numeric",
                          })
                        : "No upcoming dates";
                    })()}
                    , {event.timeStart} - {event.timeEnd}
                  </p>
                </div>
              )
            )}
          </XScrollContainer>
        </div>
      </div>
    </ContainerBlack>
  );
};

export default VenuePage;

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
