"use client";
import {  useEffect, useState } from "react";
import { Place } from "@googlemaps/google-maps-services-js";
import ContainerBlack from "../../components/ui/containers/ContainerBlack";
import XScrollContainer from "../../components/home page components/XScrollContainer";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {AiOutlineTag} from 'react-icons/ai'

  export interface Coordinates {
  latitude: number;
  longitude: number;
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




  return (
    <>
      <XScrollContainer category="Offers Today"  icon={<AiOutlineTag className="icon-large"/>}>

      </XScrollContainer>

      <XScrollContainer category="Events Today" icon={<AiOutlineTag className="icon-large"/>}>

      </XScrollContainer>

      <XScrollContainer category="Top rated places near you" icon={<AiOutlineTag className="icon-large"/>}>

      </XScrollContainer>

      <XScrollContainer category="Upcoming offers" icon={<AiOutlineTag className="icon-large"/>}>

      </XScrollContainer>

      <XScrollContainer category="Upcoming events" icon={<AiOutlineTag className="icon-large"/>}>

      </XScrollContainer>

      <XScrollContainer category="Places closest to you" icon={<AiOutlineTag className="icon-large"/>}>

      </XScrollContainer>
    </>
  );
};

export default HomePage;
