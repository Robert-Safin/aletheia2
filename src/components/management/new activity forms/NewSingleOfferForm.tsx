"use client";

import { FC, useState, useTransition } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoadingButton from "@/components/ui/loading spinner/LoadingButton";
import ImageUploader from "@/components/image uploader/ImageUploader";
import { useRouter } from "next/navigation";
export interface NewSingleOfferFormkikData {
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
}
interface Props {
  createNewSingleOffer: (
    values: NewSingleOfferFormkikData,
    base64: string[],
    venueId: string
  ) => Promise<void>;
  venueId: string;

}

const NewSingleOfferForm: FC<Props> = (props) => {
  const router = useRouter();
  const [buttonLoading, setButtonIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [isPending, startTransition]= useTransition()

  const returnFiles = (files: File[]) => {
    setFiles(files);
  };

  const validateImages = (files: File[]) => {
    if (files.length < 1) {
      setError(true)
      setErrorMessage("Image is required");
      return false;
    }

    if (files.length > 3) {
      setError(true)
      setErrorMessage("You can only upload 3 images");
      return false;
    }
    return true;
  }

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
        startTime: "00:00",
        endTime: "00:00",
      } as NewSingleOfferFormkikData}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setError(false)
        setErrorMessage("")
        setButtonIsLoading(false);

        if (values.name.length < 1) {
          setErrors({ name: "Name is required" });
          setSubmitting(false);
          return;
        }
        if (values.description.length < 1) {
          setErrors({ description: "Description is required" });
          setSubmitting(false);
          return;
        }

        const isDateInThePast = new Date(values.date) < new Date();
        const isDateSameDay =
          new Date(values.date).getDate() === new Date().getDate();

        if (isDateInThePast && !isDateSameDay) {
          setErrors({ date: "Date cannot be in the past" });
          setSubmitting(false);
          return;
        }

        if (values.startTime >= values.endTime) {
          setErrors({ endTime: "End time cannot be before start time" });
          setSubmitting(false);
          return;
        }

        if (validateImages(files)===false) {
          setSubmitting(false);
          return;
        }
        setButtonIsLoading(true);

        const filesToBase64 = files.map((file) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          return new Promise<string>((resolve, reject) => {
            fileReader.onload = () => {
              resolve(fileReader.result as string);
            };
            fileReader.onerror = (error) => {
              reject(error);
            };
          });
        });

        const base64Files = await Promise.all(filesToBase64);
        startTransition(async()=> await props.createNewSingleOffer(values, base64Files, props.venueId))
        setSubmitting(true);
        router.refresh()
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <label htmlFor="name" className="form-label mt-2 mb-1">
            Event name
          </label>

          <Field type="text" name="name" className="form-input" />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-400 mt-1"
          />

          <label htmlFor="description" className="form-label mt-2 mb-1">
            Description
          </label>

          <Field
            as="textarea"
            rows={10}
            name="description"
            className="form-input"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-400 mt-1"
          />

          <label htmlFor="date" className="form-label mt-2 mb-1">
            Date
          </label>

          <Field type="date" name="date" className="form-input" />
          <ErrorMessage
            name="date"
            component="div"
            className="text-red-400 mt-1"
          />

          <label htmlFor="startTime" className="form-label mt-2 mb-1">
            Start time
          </label>
          <Field type="time" name="startTime" className="form-input" />
          <ErrorMessage
            name="startTime"
            component="div"
            className="text-red-400 mt-1"
          />

          <label htmlFor="endTime" className="form-label mt-2 mb-1">
            End time
          </label>
          <Field type="time" name="endTime" className="form-input" />
          <ErrorMessage
            name="endTime"
            component="div"
            className="text-red-400 mt-1"
          />

          <label htmlFor="images" className="form-label mt-2 mb-1">
            Images
          </label>
          {error && <p className="text-red-400">{errorMessage}</p> }

          <ImageUploader
            accept={{ "image/png": [".png", ".webp", ".jpeg", ".jpg"] }}
            returnFiles={returnFiles}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary-wide mt-2"
          >
            {buttonLoading ? <LoadingButton type={"secondary"} /> : "CREATE"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NewSingleOfferForm;
