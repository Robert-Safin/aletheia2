"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useCallback, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCloseCircleSharp } from "react-icons/io5";
import LoadingButton from "../ui/loading spinner/LoadingButton";

export type UploadedImage = File & { preview?: string };

interface CloudinaryData {
  url: string;
  public_id: string;
}

interface Props {
  updateVenuePhotos: (venueId: number, base64: string[]) => Promise<void>;
  venueId: number;
}

const ManagementUploadPhotos: FC<Props> = (props) => {
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState(false);

  const [transition, startTransiton] = useTransition();
  const [isDisabled, setIsDisabled] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [uploadedImages, setUploadedImages] = useState<CloudinaryData[]>([]);

  const [files, setFiles] = useState<UploadedImage[]>([]);

  const { getRootProps, getInputProps } = useDropzone({

    accept: {
      "image/png": [".png", ".webp", ".jpeg", ".jpg"],
    },

    maxFiles: 6,

    onDrop: (acceptedFiles) => {

      const remainingSlots = 6 - files.length;
      const filesToBeAdded = acceptedFiles.slice(0, remainingSlots);

      if (remainingSlots <= 0) {
        setErrorMessage("You can only upload 6 photos");
        setError(true);
        return;
      }

      setFiles((prevFiles) => [
        ...prevFiles,
        ...filesToBeAdded.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
      setError(false);
    },
  });

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview!);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const thumbs = files.map((file: UploadedImage, index: number) => (
    <div key={index}>
      <Image
        src={file.preview!}
        alt="preview"
        width={500}
        height={500}
        className="w-24 h-24 object-cover rounded-md"
      />
      <IoCloseCircleSharp
        className=" text-white text-2xl relative left-[80px] bottom-[105px]"
        onClick={() => handleRemoveFile(index)}
      >
        Delete
      </IoCloseCircleSharp>
    </div>
  ));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingButton(true);
    setIsDisabled(true);

    if (files.length === 0) {
      setErrorMessage("You must upload at least one photo");
      setError(true);
      setLoadingButton(false);
      setIsDisabled(false);
      return;
    }

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


    startTransiton(() => props.updateVenuePhotos(props.venueId, base64Files));
    router.refresh();
  };

  const inputElemet = (
    <div
      {...getRootProps({
        className: "dropzone",
        style: {
          border: "2px solid white",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          height: "96px",
          width: "96px",
        },
      })}
    >
      <input {...getInputProps()} />
      <AiOutlinePlus className="text-white text-5xl" />
    </div>
  );

  return (
    <>
      <form className="px-2" onSubmit={handleSubmit}>
        <label htmlFor="" className="form-label">
          Upload up to 6 Images (.png .webp .jpeg .jpg)
        </label>
        {error && <p className="paragraph text-red-300">{errorMessage}</p>}
        <section>
          <aside
            style={{ display: "flex", flexDirection: "row", overflowX: "auto" }}
          >
            <div className="grid grid-cols-3 gap-7 my-4">
              <>
              {inputElemet}
              {thumbs}
              </>
            </div>
          </aside>
        </section>
        <button
          className="btn-primary-wide"
          type="submit"
          disabled={isDisabled}
        >
          {loadingButton ? <LoadingButton type="secondary"/> : "UPDATE"}
        </button>
      </form>
    </>
  );
};

export default ManagementUploadPhotos;
'w-full flex flex-wrap justify-evenly py-4 px-2'
