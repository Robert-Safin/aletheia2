"use client";

import { FC, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoadingButton from "@/components/ui/loading spinner/LoadingButton";

interface Props {}

const NewSingleOfferForm: FC<Props> = (props) => {
  const [buttonLoading, setButtonIsLoading] = useState(false);

  return (
    <Formik
      initialValues={{ name: "bananas" }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {}}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex flex-col">
            <div className="flex items-center">
              <label htmlFor="placeIname" className="form-label">
                Name
              </label>
            </div>

            <Field type="text" name="placeIname" className="form-input" />
            <ErrorMessage
              name="placeIname"
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
              {buttonLoading ? <LoadingButton type={"primary"} /> : "CREATE"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewSingleOfferForm;
