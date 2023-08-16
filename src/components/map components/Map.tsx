"use client";
import { FC, useEffect, useState } from "react";
import { Coordinates } from "../home page components/HomePageResults";
import { Venue, VenuePhoto } from "@prisma/client";
import MapGL, { Marker } from "react-map-gl";
import VenueInfoCard from "../VenueInfoCard/VenueInfoCard";

interface Props {
  fetchVenues: (userCoordinates: Coordinates) => Promise<PopulatedVenue[]>;
}

interface PopulatedVenue extends Venue {
  venuePhotos: VenuePhoto[];
}

const Map: FC<Props> = (props) => {
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(
    null
  );
  const [venues, setVenues] = useState<PopulatedVenue[]>([]);
  const [infoIsOpen, setInfoIsOpen] = useState<boolean>(false);
  const [venueInfo, setVenueInfo] = useState<PopulatedVenue | null>(null);

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
      const populateHomePage = async () => {
        const venues = await props.fetchVenues(userCoordinates);
        setVenues(venues);
      };
      populateHomePage();
    }
  }, [userCoordinates]);

  if (userCoordinates) {
    return (
      <>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        ></link>
        <MapGL
          mapboxAccessToken="pk.eyJ1IjoicnNhZmluIiwiYSI6ImNsbGRyMjlxeDAxOXgzZHFxMjgxZnVxMW0ifQ.NVg-MxFrrlr4xVC2MrZIgQ"
          mapLib={import("mapbox-gl")}
          initialViewState={{
            longitude: userCoordinates?.longitude,
            latitude: userCoordinates?.latitude,
            zoom: 15,
          }}
          style={{ width: "100%", height: "100vh", zIndex: 0 }}
          mapStyle="mapbox://styles/rsafin/clep2nucr000301lbw9wiuji8"
          onClick={() => setInfoIsOpen(false)}
        >
          <Marker
            latitude={userCoordinates.latitude}
            longitude={userCoordinates.longitude}
          >
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </Marker>
          {venues.map((venue) => (
            <Marker
              key={venue.id}
              latitude={venue.latitude}
              longitude={venue.longitude}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setVenueInfo(venue);
                  setInfoIsOpen(true);
                }}
                className="w-58 h-20 flex flex-col items-center justify-center"
              >
                <p className="paragraph line-clamp-1">{venue.name}</p>
                <div className="w-4 h-4 bg-actionPeach rounded-full"></div>
              </div>
            </Marker>
          ))}
        </MapGL>

        {infoIsOpen && (
          <div className="container absolute bottom-0 w-full">
            <VenueInfoCard venue={venueInfo!} />
          </div>
        )}
      </>
    );
  }
};

export default Map;
