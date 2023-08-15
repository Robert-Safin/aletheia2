"use client";
import {
  MultipleEvent,
  MultipleOffer,
  SingleEvent,
  SingleOffer,
  Venue,
  VenuePhoto,
} from "@prisma/client";
import Link from "next/link";
import { FC, useState, useTransition } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaTags } from "react-icons/fa";
import { HiOutlineExternalLink, HiOutlineTag } from "react-icons/hi";
import RatingToStars from "../ui/icons/RatingToStars";
import { BsCalendar2WeekFill } from "react-icons/bs";
import Modal from "react-modal";
import BackLink from "../ui/back link/BackLink";
import ImageCarousel from "../ui/image carousel/ImageCarousel";
import { useRouter } from "next/navigation";
import LoadingButton from "../ui/loading spinner/LoadingButton";

Modal.setAppElement("#root");

interface Props {
  venue: Venue & {
    venuePhotos: VenuePhoto[];
    singleEvents: SingleEvent[];
    multipleEvents: MultipleEvent[];
    singleOffers: SingleOffer[];
    multipleOffers: MultipleOffer[];
  };
  deleteVenue: (venueId: number) => Promise<void>;
}

const ManagementViewPage: FC<Props> = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [newOfferIsOpen, setNewOfferIsOpen] = useState(false);
  const [newEventIsOpen, setNewEventIsOpen] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setNewOfferIsOpen(false);
    setNewEventIsOpen(false);
    setDeleteModalIsOpen(false);
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
      width: "370px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const formatOpeningHours = props.venue.openingHours!.split("\n");

  const handleDelete = async () => {
    setDeleteLoading(true);
    startTransition(async () => {
      await props.deleteVenue(props.venue.id);
    });
  };

  return (
    <>
      <BackLink href="/management" name="Your venues" />
      <div className="container bg-grayPrimary h-max pb-16 px-4">
        <ImageCarousel photos={props.venue.venuePhotos} />
        <h1 className="main-header mt-2">{props.venue?.name}</h1>
        <div className="flex items-center mt-2 mb-1">
          <RatingToStars rating={props.venue!.averageRating} iconClass="icon-small"/>
          <Link
            href={props.venue.googleMapsUrl}
            target="_blank"
            className="small-text ml-2"
          >
            {props.venue?.totalReviews} reviews
          </Link>
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
        <h2 className="secondary-header mt-4 mb-1">Google page:</h2>

        <Link
          href={props.venue?.googleMapsUrl}
          className="flex space-x-2 items-center"
          target="_blank"
        >
          <HiOutlineExternalLink className="icon-small" />
          <p className="small-text">open link</p>
        </Link>
        <h2 className="secondary-header mt-4 mb-1">Categories:</h2>

        <div className="flex flex-wrap whitespace-nowrap">
          {props.venue?.categories?.split(",").map((category, index) => (
            <p className="category" key={index}>
              {category}
            </p>
          ))}
        </div>
        <h1 className="secondary-header">Hours:</h1>
        <div className="space-y-1">
          {props.venue.openingHours &&
            formatOpeningHours.map((day, index) => (
              <p className="paragraph" key={index}>
                {day}
              </p>
            ))}
        </div>

        <div className="flex justify-between space-x-2 mt-4">
          <button
            className="btn-primary-small w-full"
            onClick={() => setNewOfferIsOpen(true)}
          >
            NEW OFFER
          </button>
          <button
            className="btn-primary-small w-full"
            onClick={() => setNewEventIsOpen(true)}
          >
            NEW EVENT
          </button>
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
      <Modal
        isOpen={modalIsOpen || newOfferIsOpen || newEventIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        {!deleteModalIsOpen && !newOfferIsOpen && !newEventIsOpen && (
          <div className="flex flex-col py-4 w-full">
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
            <button
              onClick={() => setDeleteModalIsOpen(true)}
              className="btn-primary-small bg-red-500"
            >
              DELETE
            </button>
          </div>
        )}

        {deleteModalIsOpen && (
          <div className="flex flex-col">
            <h2 className="secondary-header text-center mb-4">Are you sure?</h2>
            <button
              onClick={handleDelete}
              className="btn-primary-small bg-red-500 mb-4"
            >
              {deleteLoading ? (
                <LoadingButton type="secondary" />
              ) : (
                "YES, DELETE MY VENUE"
              )}
            </button>
            <button
              className="btn-secondary-small"
              onClick={() => setDeleteModalIsOpen(false)}
            >
              CANCEL
            </button>
          </div>
        )}

        {newOfferIsOpen && (
          <>
          <h2 className="secondary-header text-center mt-2">Will the offer exist multiple days?</h2>
          <div className="flex justify-between space-x-2 py-4">
            <Link href={`/management/${props.venue.id}/newSingleOffer`} className="btn-primary-small w-full text-center">NO</Link>
            <Link href={`/management/${props.venue.id}/newMultipleOffer`} className="btn-primary-small w-full text-center">YES</Link>
          </div>
          </>
        )}

        {newEventIsOpen && (
          <>
          <h2 className="secondary-header text-center mt-2">Will the event exist multiple days?</h2>
          <div className="flex justify-between space-x-2 py-4">
            <Link href={`/management/${props.venue.id}/newSingleEvent`} className="btn-primary-small w-full text-center">NO</Link>
            <Link href={`/management/${props.venue.id}/newMultipleEvent`} className="btn-primary-small w-full text-center">YES</Link>
          </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ManagementViewPage;
////
