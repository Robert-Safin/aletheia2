"use client";
import { AiOutlineTag } from "react-icons/ai";
import SearchBar from "./SearchBar";
import XScrollContainer from "./XScrollContainer";
import { FC, useEffect, useState } from "react";
import {
  MultipleEvent,
  MultipleEventPhoto,
  MultipleOffer,
  MultipleOfferPhoto,
  SingleEvent,
  SingleEventPhoto,
  SingleOffer,
  SingleOfferPhoto,
  Venue,
  VenuePhoto,
} from "@prisma/client";
import VenueClose from "./cards/VenueClose";
import { IoLocationOutline } from "react-icons/io5";
import UpcomingEvent from "./cards/UpcomingEvent";
import { BsCalendar2WeekFill } from "react-icons/bs";
import TodayEvent from "./cards/TodayEvent";
import UpcomingOffer from "./cards/UpcomingOffer";
import TodayOffer from "./cards/TodayOffer";
import { LuVerified } from "react-icons/lu";
import HomePageLoader from "./HomePageLoader";
export interface SearchParams {
  type: string;
  when: "today" | "tomorrow";
  distanceKm: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PopulatedVenue extends Venue {
  venuePhotos: VenuePhoto[];

  singleEvents: (SingleEvent & {
    singleEventPhoto: SingleEventPhoto[];
  })[];

  multipleEvents: (MultipleEvent & {
    multipleEventPhoto: MultipleEventPhoto[];
  })[];

  singleOffers: (SingleOffer & {
    singleOfferPhoto: SingleOfferPhoto[];
  })[];

  multipleOffers: (MultipleOffer & {
    multipleOfferPhoto: MultipleOfferPhoto[];
  })[];
  distanceFromUser?: string;
}

interface Props {
  getSearchParams: (
    coordinates: Coordinates,
    searchParams: SearchParams
  ) => Promise<PopulatedVenue[]>;
}

const HomePageResults: FC<Props> = (props) => {
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(
    null
  );
  const [radiusKm, setRadiusKm] = useState<number>(5);
  const [type, setType] = useState<string>("");
  const [when, setWhen] = useState<"today" | "tomorrow">("today");
  const [venues, setVenues] = useState<PopulatedVenue[]>([]);

  useEffect(() => {
    if (navigator.geolocation && !userCoordinates) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }

    if (userCoordinates) {
      const populareHomePage = async () => {
        const venues = await props.getSearchParams(userCoordinates, {
          type: type,
          when: when,
          distanceKm: radiusKm,
        });
        setVenues(venues);
      };
      populareHomePage();
    }
  }, [props, userCoordinates, radiusKm, type, when]);

  if (venues.length === 0) {
    return (
      <HomePageLoader/>
    )
  }

  return (
    <>
      <SearchBar />
      <XScrollContainer
        category="Offers Today"
        icon={<AiOutlineTag className="icon-large" />}
      >
        {venues.flatMap((venue) => {
          const offers = [...venue.singleOffers, ...venue.multipleOffers];
          return offers.map((offer) => (
            <TodayOffer key={offer.id} offer={offer} venueName={venue.name} venueId={venue.id}/>
          ));
        })}
      </XScrollContainer>

      <XScrollContainer
        category="Events Today"
        icon={<BsCalendar2WeekFill className="icon-large" />}
      >
        {venues.flatMap((venue) => {
          const events = [...venue.singleEvents, ...venue.multipleEvents];
          return events.map((event) => (
            <TodayEvent key={event.id} event={event} venueName={venue.name} venueId={venue.id}/>
          ));
        })}
      </XScrollContainer>

      <XScrollContainer
        category="Top rated places near you"
        icon={<LuVerified className="icon-large" />}
      >
        {venues
          .sort((a, b) => b.averageRating - a.averageRating)
          .map((venue) => (
            <VenueClose
              key={venue.id}
              venue={venue}
              userCoordinates={userCoordinates}
            />
          ))}
      </XScrollContainer>

      <XScrollContainer
        category="Upcoming offers"
        icon={<AiOutlineTag className="icon-large" />}
      >
        {venues.flatMap((venue) => {
          const offers = [...venue.singleOffers, ...venue.multipleOffers];
          return offers.map((offer) => (
            <UpcomingOffer
              key={offer.id}
              offer={offer}
              venueName={venue.name} venueId={venue.id}
            />
          ));
        })}
      </XScrollContainer>

      <XScrollContainer
        category="Upcoming events"
        icon={<BsCalendar2WeekFill className="icon-large" />}
      >
        {venues.flatMap((venue) => {
          const events = [...venue.singleEvents, ...venue.multipleEvents];
          return events.map((event) => (
            <UpcomingEvent
              key={event.id}
              event={event}
              venueName={venue.name} venueId={venue.id}
            />
          ));
        })}
      </XScrollContainer>

      <XScrollContainer
        category="Places close to you"
        icon={<IoLocationOutline className="icon-large" />}
      >
        {venues.map((venue) => (
          <VenueClose
            key={venue.id}
            venue={venue}
            userCoordinates={userCoordinates}
          />
        ))}
      </XScrollContainer>
    </>
  );
};

export default HomePageResults;
