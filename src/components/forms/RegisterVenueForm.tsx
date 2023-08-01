'use client'

import { FC, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Place } from "@googlemaps/google-maps-services-js";
import { MainHeader } from "../ui/text elements/Headers";
import Image from "next/image";
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'
import RatingToStars from "../ui/icons/RatingToStars";
import ContainerGray from "../ui/containers/ContainerGray";

interface Props {
  findListingOnGoogle: (placeId:string) => Promise<Place>;
}

const RegisterVenueForm: FC<Props> = (props) => {
  const [place, setPlace] = useState<Place>();

  const validationSchema = Yup.object().shape({
    placeId: Yup.string()
      .required('URL is required'),
  });




  return (
    <ContainerGray>
      <Formik
      initialValues={{ placeId: 'ChIJSQmJjmo90i0RYAAftLe2Y24' }}
      validationSchema={validationSchema}
      onSubmit={async(values, { setSubmitting }) => {
        const place = await props.findListingOnGoogle(values.placeId);
        setPlace(place);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="placeId">Place ID</label>
            <Field type="text" name="placeId" />
            <ErrorMessage name="placeId" component="div" />
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>

   {place && <div>
    <MainHeader title={place!.name!} />
    <div className="flex space-x-4 items-center">
      <RatingToStars rating={place.rating!} />
      <p>{place.user_ratings_total}</p>
    </div>

    <Image src={place.photos![0].photo_reference} alt="image" width={1000} height={1000} className="img-large"/>

   </div>}
    </ContainerGray>







  );
};

export default RegisterVenueForm;
