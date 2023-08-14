"use client";

import { FC, useState, useTransition } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoadingButton from "@/components/ui/loading spinner/LoadingButton";
import ImageUploader from "@/components/image uploader/ImageUploader";
import { useRouter } from "next/navigation";

export interface NewMultipleEventFormkikData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  onMonday: boolean;
  onTuesday: boolean;
  onWednesday: boolean;
  onThursday: boolean;
  onFriday: boolean;
  onSaturday: boolean;
  onSunday: boolean;
}
interface Props {
  createNewMultipleEvent: (
    data: NewMultipleEventFormkikData,
    files: string[],
    venueId: string
  ) => Promise<void>;
  venueId: string;
}

const NewMultipleEventForm: FC<Props> = (props) => {
  const router = useRouter();
  const [buttonLoading, setButtonIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [isPending, startTransition] = useTransition();

  const returnFiles = (files: File[]) => {
    setFiles(files);
  };

  const validateImages = (files: File[]) => {
    if (files.length < 1) {
      setError(true);
      setErrorMessage("Image is required");
      return false;
    }

    if (files.length > 3) {
      setError(true);
      setErrorMessage("You can only upload 3 images");
      return false;
    }
    return true;
  };

  return (
    <Formik
      initialValues={
        {
          name: "",
          description: "",
          startDate: new Date().toISOString().slice(0, 10),
          endDate: new Date().toISOString().slice(0, 10),
          startTime: "00:00",
          endTime: "00:00",
          onMonday: false,
          onTuesday: false,
          onWednesday: false,
          onThursday: false,
          onFriday: false,
          onSaturday: false,
          onSunday: false,
        } as NewMultipleEventFormkikData
      }
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setError(false);
        setErrorMessage("");
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

        const isDateInThePast = new Date(values.startDate) < new Date();
        const isDateSameDay =
          new Date(values.startDate).getDate() === new Date().getDate();

        if (isDateInThePast && !isDateSameDay) {
          setErrors({ startDate: "Start date cannot be in the past" });
          setSubmitting(false);
          return;
        }

        if (values.startDate >= values.endDate) {
          setErrors({
            endDate: "End date cannot be less or equal to start date",
          });
          setSubmitting(false);
          return;
        }

        if (values.startTime >= values.endTime) {
          setErrors({ endTime: "End time cannot be before start time" });
          setSubmitting(false);
          return;
        }

        if (
          values.onMonday === false &&
          values.onTuesday === false &&
          values.onWednesday === false &&
          values.onThursday === false &&
          values.onFriday === false &&
          values.onSaturday === false &&
          values.onSunday === false
        ) {
          setErrors({ onMonday: "At least one day must be selected" });
          setSubmitting(false);
          return;
        }

        if (validateImages(files) === false) {
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
        startTransition(
          async () =>
            await props.createNewMultipleEvent(
              values,
              base64Files,
              props.venueId
            )
        );
        setSubmitting(true);
        router.refresh()
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
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

          <label htmlFor="startDate" className="form-label mt-2 mb-1">
            Start date
          </label>

          <Field type="startDate" name="startDate" className="form-input" />
          <ErrorMessage
            name="startDate"
            component="div"
            className="text-red-400 mt-1"
          />

          <label htmlFor="endDate" className="form-label mt-2 mb-1">
            End date
          </label>

          <Field type="endDate" name="endDate" className="form-input" />
          <ErrorMessage
            name="endDate"
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

          <label className="form-label mt-2 mb-1">Which days of the week</label>
          <ErrorMessage
            name="onMonday"
            component="div"
            className="text-red-400 mt-1"
          />
          <div className="flex flex-wrap">
            <label
              htmlFor="onMonday"
              className={
                values.onMonday ? "category bg-actionPeach" : "category"
              }
              onClick={() => setFieldValue("onMonday", !values.onMonday)}
            >
              Monday
            </label>
            <Field type="checkbox" name="onMonday" className="hidden" />
            <label
              htmlFor="onTuesday"
              className={
                values.onTuesday ? "category bg-actionPeach" : "category"
              }
              onClick={() => setFieldValue("onTuesday", !values.onTuesday)}
            >
              Tuesday
            </label>
            <Field type="checkbox" name="onTuesday" className="hidden" />
            <label
              htmlFor="onWednesday"
              className={
                values.onWednesday ? "category bg-actionPeach" : "category"
              }
              onClick={() => setFieldValue("onWednesday", !values.onWednesday)}
            >
              Wednesday
            </label>
            <Field type="checkbox" name="onWednesday" className="hidden" />
            <label
              htmlFor="onThursday"
              className={
                values.onThursday ? "category bg-actionPeach" : "category"
              }
              onClick={() => setFieldValue("onThursday", !values.onThursday)}
            >
              Thursday
            </label>
            <Field type="checkbox" name="onThursday" className="hidden" />
            <label
              htmlFor="onFriday"
              className={
                values.onFriday ? "category bg-actionPeach" : "category"
              }
              onClick={() => setFieldValue("onFriday", !values.onFriday)}
            >
              Friday
            </label>
            <Field type="checkbox" name="onFriday" className="hidden" />
            <label
              htmlFor="onSaturday"
              className={
                values.onSaturday ? "category bg-actionPeach" : "category"
              }
              onClick={() => setFieldValue("onSaturday", !values.onSaturday)}
            >
              Saturday
            </label>
            <Field type="checkbox" name="onSaturday" className="hidden" />
            <label
              htmlFor="onSunday"
              className={
                values.onSunday ? "category bg-actionPeach" : "category"
              }
              onClick={() => setFieldValue("onSunday", !values.onSunday)}
            >
              Sunday
            </label>
            <Field type="checkbox" name="onSunday" className="hidden" />
          </div>

          <label htmlFor="images" className="form-label mt-2 mb-1">
            Images
          </label>
          {error && <p className="text-red-400">{errorMessage}</p>}

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

export default NewMultipleEventForm;
