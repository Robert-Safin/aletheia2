"use client";
import { AiOutlineTag } from "react-icons/ai";
import SearchBar from "./SearchBar";
import XScrollContainer from "./XScrollContainer";
import { FC, useEffect, useState } from "react";
import {
  MultipleEvent,
  MultipleOffer,
  SingleEvent,
  SingleOffer,
  Venue,
  VenuePhoto,
} from "@prisma/client";
import VenueClose from "./cards/VenueClose";
import {IoLocationOutline} from "react-icons/io5";
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
    singleEvents: SingleEvent[];
    multipleEvents: MultipleEvent[];
    singleOffers: SingleOffer[];
    multipleOffers: MultipleOffer[];

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

  return (
    <>
      <SearchBar />
      <XScrollContainer
        category="Offers Today"
        icon={<AiOutlineTag className="icon-large" />}
      >

      </XScrollContainer>

      <XScrollContainer
        category="Events Today"
        icon={<AiOutlineTag className="icon-large" />}
      >

      </XScrollContainer>

      <XScrollContainer
        category="Top rated places near you"
        icon={<AiOutlineTag className="icon-large" />}
      >

      </XScrollContainer>

      <XScrollContainer
        category="Upcoming offers"
        icon={<AiOutlineTag className="icon-large" />}
      >

      </XScrollContainer>

      <XScrollContainer
        category="Upcoming events"
        icon={<AiOutlineTag className="icon-large" />}
      >

      </XScrollContainer>

      <XScrollContainer
        category="Places closest to you"
        icon={<IoLocationOutline className="icon-large" />}
      >
        {venues.map((venue) => (
          <VenueClose key={venue.id} venue={venue} userCoordinates={userCoordinates} />
        ))}
      </XScrollContainer>
    </>
  );
};

export default HomePageResults;
