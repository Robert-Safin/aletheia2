import Image from "next/image";
import { FC, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCloseCircleSharp } from "react-icons/io5";

interface ImageUploaderProps {
  accept: DropzoneOptions["accept"];
  returnFiles: (files: File[]) => void;


}

const ImageUploader: FC<ImageUploaderProps> = ({ accept, returnFiles }) => {
  const [images, setImages] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedImages) => {
      const newImages = [...images, ...acceptedImages];
      setImages(newImages);
      returnFiles(newImages);
    },

    accept: accept,
  });

  const handleRemoveFile = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    returnFiles(newImages);
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

  const thumbs = images.map((image: File, index: number) => (
    <div key={index}>
      <Image
        src={URL.createObjectURL(image)}
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

  return (
    <>
      <section>
        <aside
          style={{ display: "flex", flexDirection: "row", overflowX: "auto" }}
        >
          <div className="grid grid-cols-3 gap-7 my-4">
            {inputElemet}
            {thumbs}
          </div>
        </aside>
      </section>
    </>
  );
};

export default ImageUploader;
