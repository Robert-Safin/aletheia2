"use client";

import { FC, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Place } from "@googlemaps/google-maps-services-js";
import Image from "next/image";
import { BsInfoCircle } from "react-icons/bs";
import RatingToStars from "../ui/icons/RatingToStars";
import { useTransition } from "react";
import { GooglePlaceError } from "@/app/management/registerVenue/page";
import { useRouter } from "next/navigation";
import LoadingButton from "../ui/loading spinner/LoadingButton";
import ToolTip from "../ui/tooltip/Tooltip";
import ContainerGray from "../ui/containers/ContainerGray";
interface Props {
  findListingOnGoogle: (placeId: string) => Promise<Place | GooglePlaceError>;
  createVenue: (venue: Place) => Promise<void>;
}

const RegisterVenueForm: FC<Props> = (props) => {
  const [place, setPlace] = useState<Place | null>();
  const [isPending, startTransition] = useTransition();
  const [buttonLoading, setButtonIsLoading] = useState(false);
  const [buttonLoading2, setButtonIsLoading2] = useState(false);

  const router = useRouter();

  const formatOpeningHours = place?.opening_hours?.weekday_text.map(
    (day, index) => {
      return (
        <p className="paragraph" key={index}>
          {day}
        </p>
      );
    }
  );

  const handleSubmit = () => {
    setButtonIsLoading2(true);
    startTransition(async () => await props.createVenue(place!));
    router.refresh();
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{ placeId: "ChIJSQmJjmo90i0RYAAftLe2Y24" }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            if (values.placeId.trim().length === 0) {
              setErrors({ placeId: "Place ID is required" });
              setPlace(null);
              setSubmitting(false);
              setButtonIsLoading(false);
              return;
            }
            setButtonIsLoading(true);
            const googlePlaceResponse = await props.findListingOnGoogle(
              values.placeId
            );
            if ("error_message" in googlePlaceResponse) {
              setErrors({ placeId: googlePlaceResponse.error_message });
              setPlace(null);
              setSubmitting(false);
              setButtonIsLoading(false);
              return;
            }
            setPlace(googlePlaceResponse);
            setButtonIsLoading(false);
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
                  <ToolTip
                    tooltipId="1"
                    position="right"
                    content={
                      <>
                        <p className="text-xs w-60">
                          You can find your Place ID by following these
                          instructions <a className="underline" target="_blank" href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder">here</a>.
                        </p>
                      </>
                    }
                  />
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
                  {buttonLoading ? (
                    <LoadingButton type={"primary"} />
                  ) : (
                    "SEARCH"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {place && (
        <>
          <div className="bg-grayPrimary rounded-md p-2 my-2">
            <h2 className="secondary-header">{place!.name!}</h2>
            <div className="flex space-x-4 items-center mb-2">
              <RatingToStars rating={place.rating!} />
              <p className="small-text">
                {String(place.user_ratings_total) + " ratings"}
              </p>
            </div>

            {place.photos![0].photo_reference && (
              <>
                <Image
                  src={`data:image/jpeg;base64,${
                    place.photos![0].photo_reference
                  }`}
                  alt="image"
                  width={1000}
                  height={1000}
                  className="img-large"
                />
              </>
            )}
            {place.formatted_address && (
              <>
                <h2 className="secondary-header">Address</h2>
                <p className="paragraph">{place.formatted_address!}</p>
              </>
            )}

            {place.formatted_phone_number && (
              <>
                <h2 className="secondary-header">Phone</h2>
                <p className="paragraph">{place.formatted_phone_number!}</p>
              </>
            )}

            {place.website && (
              <>
                <h2 className="secondary-header">Website</h2>
                <p className="paragraph">{place.website!}</p>
              </>
            )}

            {place.url && (
              <>
                <h2 className="secondary-header">Google maps URL</h2>
                <p className="paragraph">{place.url!}</p>
              </>
            )}

            {place.opening_hours && (
              <>
                <h2 className="secondary-header">Opening hours</h2>
                {formatOpeningHours}
              </>
            )}

            {place.types && (
              <>
                <h2 className="secondary-header">Categories</h2>
                <p className="paragraph">{place.types!.join(", ")}</p>
              </>
            )}
          </div>

          <div className="bg-grayPrimary rounded-md p-2 my-2">
            <h2 className="secondary-header">Disclaimer</h2>
            <p className="paragraph">lorem ipsum</p>
          </div>

          <div className="bg-grayPrimary rounded-md p-2 my-2">
            <button className="btn-primary-wide" onClick={handleSubmit}>
              {buttonLoading2 ? <LoadingButton type={"secondary"} /> : "SUBMIT"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default RegisterVenueForm;
