"use client";
import {  useEffect, useState } from "react";
import { Place } from "@googlemaps/google-maps-services-js";
import ContainerBlack from "../components/containers/ContainerBlack";
import ContainerGray from "../components/containers/ContainerGray";
import XScrollContainer from "../components/home page components/XScrollContainer";

import {HiOutlineLocationMarker} from "react-icons/hi";
import VenueCard from "../components/home page components/VenueCard";
import { HomePageResponse } from "../api/populate/route";
  export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface HomePageSearchParams {
  coordinates: Coordinates;
  radius: number;
  type: string;
}

const HomePage = () => {
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(null);
  const [radius, setRadius] = useState<number>(500);
  const [type, setType] = useState<string>("");
  const [venues, setVenues] = useState<Place[]>([]);

  useEffect(() => {
    if (navigator.geolocation && !userCoordinates) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  });

  useEffect(() => {
    const populateHomePage = async () => {
      if (userCoordinates) {
        const searchParams: HomePageSearchParams = {
          coordinates: userCoordinates,
          radius: radius,
          type: type,
        };
        const response = await fetch("/api/populate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchParams),
        });
        const data = await response.json() as HomePageResponse
        setVenues(data.venues);

      }

    };
    populateHomePage();
  },[userCoordinates, radius, type]);



  return (
    <ContainerBlack>




      <XScrollContainer icon={<HiOutlineLocationMarker/>}>
        {venues.map((venue) => (
        <VenueCard key={venue.place_id} venue={venue}/>
        ))}
        {/* <VenueCard venue={venues[0]}/> */}
      </XScrollContainer>



    </ContainerBlack>
  );
};

export default HomePage;
