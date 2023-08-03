"use client";
import { Venue } from "@prisma/client";
import { FC, useTransition } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { UpdateVenueDataFromClient } from "@/app/management/[venueId]/updateData/page";
import { useRouter } from "next/navigation";
interface Props {
  venue: Venue;
  updateVenueDataFromOwner: (data: UpdateVenueDataFromClient) => void
}

const ManagementUpdateDataForm: FC<Props> = (props) => {
  const [transition, startTransition] = useTransition()
  const router = useRouter();

  const existingDescription = props.venue.description ? props.venue.description : "";
  const existingCategories = props.venue.categories?.split(",")

  const existingCategory1 = existingCategories && existingCategories[0] ? existingCategories[0] : "";
  const existingCategory2 = existingCategories && existingCategories[1] ? existingCategories[1] : "";
  const existingCategory3 = existingCategories && existingCategories[2] ? existingCategories[2] : "";
  const existingCategory4 = existingCategories && existingCategories[3] ? existingCategories[3] : "";
  const existingCategory5 = existingCategories && existingCategories[4] ? existingCategories[4] : "";
  const existingCategory6 = existingCategories && existingCategories[5] ? existingCategories[5] : "";








  return (
    <>
      <Formik
        initialValues={{
          description: existingDescription,
          category1: existingCategory1,
          category2: existingCategory2,
          category3: existingCategory3,
          category4: existingCategory4,
          category5: existingCategory5,
          category6: existingCategory6,

        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          if (values.description.length > 1000) {
            setErrors({ description: "Description must be less than 1000 characters." });
            setSubmitting(false);
          }

          const newCategories = [values.category1, values.category2, values.category3, values.category4, values.category5, values.category6].filter((category) => category !== "");

          if (newCategories) {
            if (newCategories.length > 6) {
              setErrors({ category1: "You can only have up to 6 categories." });
              setSubmitting(false);
            }
            if (newCategories.length === 0) {
              setErrors({ category1: "You must have at least 1 category." });
              setSubmitting(false);
            }
          }

          startTransition(()=> props.updateVenueDataFromOwner({ description: values.description, categories: newCategories.join(","), venueId: props.venue.id } as UpdateVenueDataFromClient))
          router.refresh()

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col p-2">



            <label htmlFor="description" className="form-label mt-2 mb-1">
              Description
            </label>
            <Field as="textarea" rows={20} name="description" className="form-input" placeholder={'Enter a short description about your venue and what you have to offer. Max 1000 charecters.'}/>
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-400 mt-1"
            />


            <label htmlFor="categories" className="form-label mt-2 mb-1">
              Categories
            </label>
            <div className="grid grid-cols-2 gap-4">
            <Field type="text" name="category1" className="bg-graySecondary rounded-md w-full p-1 text-white" />
            <Field type="text" name="category2" className="bg-graySecondary rounded-md w-full p-1 text-white" />
            <Field type="text" name="category3" className="bg-graySecondary rounded-md w-full p-1 text-white" />
            <Field type="text" name="category4" className="bg-graySecondary rounded-md w-full p-1 text-white" />
            <Field type="text" name="category5" className="bg-graySecondary rounded-md w-full p-1 text-white" />
            <Field type="text" name="category6" className="bg-graySecondary rounded-md w-full p-1 text-white" />

            </div>

            <ErrorMessage
              name="category1"
              component="div"
              className="text-red-400 mt-1"
            />


            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-secondary-wide mt-2"
            >
              UPDATE
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ManagementUpdateDataForm;
