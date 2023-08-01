"use client";

import { FC, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Place } from "@googlemaps/google-maps-services-js";
import { MainHeader, SecondaryHeader } from "../ui/text elements/Headers";
import Image from "next/image";
import { BsStarFill, BsStarHalf, BsStar, BsInfoCircle } from "react-icons/bs";
import RatingToStars from "../ui/icons/RatingToStars";
import ContainerGray from "../ui/containers/ContainerGray";
import { Paragraph, SmallText } from "../ui/text elements/Texts";
import { Venue } from "@prisma/client";

interface Props {
  findListingOnGoogle: (placeId: string) => Promise<Place>;
  createVenue: (venue: Place) => Promise<void>;
}

const RegisterVenueForm: FC<Props> = (props) => {
  const [place, setPlace] = useState<Place>();
  const [tooltipIsActive, setTooltipIsActive] = useState<boolean>(false);

  const handleTooltipClick = () => {
    setTooltipIsActive(true);
    setTimeout(() => {
    setTooltipIsActive(false);
    }, 8000);
  }

  const validationSchema = Yup.object().shape({
    placeId: Yup.string().required("ID is required"),
  });

  const formatOpeningHours = place?.opening_hours?.weekday_text.map((day, index) => {
    return <Paragraph content={day} key={index} />;
  });



  return (
    <>
      <div className="bg-grayPrimary rounded-md p-2">
        <Formik
          initialValues={{ placeId: "ChIJSQmJjmo90i0RYAAftLe2Y24" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const place = await props.findListingOnGoogle(values.placeId);
            setPlace(place);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <label htmlFor="placeId" className="form-label">
                    Place ID
                  </label>
                  <BsInfoCircle
                    className="icon-small mx-2"
                    onClick={handleTooltipClick}
                  />
                  {tooltipIsActive && <p className="text-white text-xs">
                    You can find your Place ID by following these instructions on <a className="underline" target="_blank" href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder">here.</a>
                    </p>
                    }

                </div>

                <Field type="text" name="placeId" className="form-input" />
                <ErrorMessage
                  name="placeId"
                  component="div"
                  className="text-red-400 mt-1"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-secondary-wide mt-2"
                >
                  SEARCH
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {place && (
        <>
          <div className="bg-grayPrimary rounded-md p-2 my-2">
            <MainHeader title={place!.name!} />
            <div className="flex space-x-4 items-center mb-2">
              <RatingToStars rating={place.rating!} />
              <SmallText
                content={String(place.user_ratings_total) + " ratings"}
              />
            </div>

            {place.photos![0].photo_reference && (
              <>
                <Image
                  src={`data:image/jpeg;base64,${place.photos![0].photo_reference}`}
                  alt="image"
                  width={1000}
                  height={1000}
                  className="img-large"
                />
              </>
            )}
            {place.formatted_address && (
              <>
                <SecondaryHeader title="Address" />
                <Paragraph content={place.formatted_address!} />
              </>
            )}

            {place.formatted_phone_number && (
              <>
                <SecondaryHeader title="Phone" />
                <Paragraph content={place.formatted_phone_number!} />
              </>
            )}

            {place.website && (
              <>
                <SecondaryHeader title="Website" />
                <Paragraph content={place.website!} />
              </>
            )}

            {place.url && (
              <>
                <SecondaryHeader title="Google maps URL" />
                <Paragraph content={place.url!} />
              </>
            )}

            {place.opening_hours && (
              <>
                <SecondaryHeader title="Opening hours" />
                {formatOpeningHours}
              </>
            )}

            {place.types && (
              <>
                <SecondaryHeader title="Categories" />
                <Paragraph content={place.types!.join(", ")} />
              </>
            )}
          </div>
          <div className="bg-grayPrimary rounded-md p-2 my-2">
            <button className="btn-primary-wide" onClick={() => props.createVenue(place)}>CONFIRM</button>
          </div>
        </>
      )}

    </>
  );
};

export default RegisterVenueForm;
