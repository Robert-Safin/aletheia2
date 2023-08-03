"use client";
import {
  MultipleEvent,
  MultipleOffer,
  SingleEvent,
  SingleOffer,
  Venue,
  VenuePhoto,
} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaTags } from "react-icons/fa";
import { HiOutlineExternalLink, HiOutlineTag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import RatingToStars from "../ui/icons/RatingToStars";
import { BsCalendar2WeekFill } from "react-icons/bs";
import Modal from "react-modal";
import BackLink from "../ui/back link/BackLink";

Modal.setAppElement("#root");

interface Props {
  venue: Venue & {
    venuePhotos: VenuePhoto[];
    singleEvents: SingleEvent[];
    multipleEvents: MultipleEvent[];
    singleOffers: SingleOffer[];
    multipleOffers: MultipleOffer[];
  };
}

const ManagementViewPage: FC<Props> = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#262626",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  return (
    <>
      <div className="bg-grayPrimary h-screen">
        <BackLink href="/management" name="Your venues"/>
        <div className="container bg-grayPrimary h-max pb-16 px-4">
          <Image
            className="img-large mx-auto"
            src={props.venue!.venuePhotos[0].cloudinaryUrl}
            alt="photo"
            width={1000}
            height={1000}
          />
          <h1 className="main-header mt-2">{props.venue?.name}</h1>
          <div className="flex items-center mt-2 mb-1">
            <RatingToStars rating={props.venue!.averageRating} />
            <p className="small-text ml-2">
              {props.venue?.totalReviews} reviews
            </p>
          </div>

          <div className="flex space-x-4">
            <div className="flex space-x-2 items-center">
              <BsCalendar2WeekFill className="icon-small" />
              <p className="small-text">
                {props.venue?.singleEvents.length! +
                  props.venue?.multipleEvents.length!}{" "}
                events
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <FaTags className="icon-small" />
              <p className="small-text">
                {props.venue?.singleOffers.length! +
                  props.venue?.multipleOffers.length!}{" "}
                offers
              </p>
            </div>
          </div>

          <h2 className="secondary-header mt-4 mb-1">About:</h2>
          <p className="paragraph">
            {props.venue?.description
              ? props.venue.description
              : "No description"}
          </p>

          <h2 className="secondary-header mt-4 mb-1">Address:</h2>
          <p className="paragraph">{props.venue?.formattedAdress}</p>

          <h2 className="secondary-header mt-4 mb-1">Phone:</h2>
          <p className="paragraph">{props.venue?.formattedPhoneNumber}</p>

          <h2 className="secondary-header mt-4 mb-1">Website:</h2>
          {props.venue?.website ? (
            <div>
              <Link
                href={props.venue?.website!}
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

          <h2 className="secondary-header mt-4 mb-1">Categories:</h2>

          <div className="flex flex-wrap whitespace-nowrap">
            {props.venue?.categories?.split(",").map((category, index) => (
              <p className="category" key={index}>
                {category}
              </p>
            ))}
          </div>
          <div className="flex justify-between space-x-2 mt-4">
            <button className="btn-primary-small w-full">NEW OFFER</button>
            <button className="btn-primary-small w-full">NEW EVENT</button>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="btn-secondary-wide mt-2 mb-4"
          >
            UPDATE
          </button>

          <div className="flex space-x-2 items-center">
            <HiOutlineTag className="icon-large" />
            <h1 className="main-header">Offers</h1>
          </div>
          <div className="flex space-x-2 items-center">
            <AiOutlineCalendar className="icon-large" />
            <h1 className="main-header">Events</h1>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="flex flex-col py-4 px-4 w-full">
          <Link href={`/management/${props.venue.id}/updateData`}>
            <button className="btn-secondary-small w-full mb-2">
              UPDATE VENUE INFORMATION
            </button>
          </Link>
          <Link href={`/management/${props.venue.id}/updatePhotos`}>
            <button className="btn-secondary-small w-full mb-8">
              UPDATE PHOTOS
            </button>
          </Link>

            <button className="btn-primary-small w-full bg-red-500">
              DELETE VENUE
            </button>

        </div>
      </Modal>
    </>
  );
};

export default ManagementViewPage;
