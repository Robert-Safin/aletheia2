"use client";
import ImageUploader from "@/components/image uploader/ImageUploader";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import LoadingButton from "@/components/ui/loading spinner/LoadingButton";
import LoadingSpinner from "@/components/ui/loading spinner/LoadingSpinner";
import ToolTip from "@/components/ui/tooltip/Tooltip";
import Image from "next/image";
import { useState } from "react";

import { AiTwotoneStar } from "react-icons/ai";
import { IoCloseCircleSharp } from "react-icons/io5";

const FigrmaComponents = () => {

  const returnFiles = (files: File[]) => {
    console.log(files);

  }


  return (
    <ContainerGray>
      <h1 className="main-header">main header</h1>
      <h2 className="secondary-header">secondary header</h2>
      <p className="paragraph">paragraph</p>
      <p className="small-text">small text</p>
      <AiTwotoneStar className="icon-large" />
      <AiTwotoneStar className="icon-small" />

      <p>primary wide button</p>
      <button className="btn-primary-wide">BUTTON</button>
      <p>secondary wide button</p>
      <button className="btn-secondary-wide">BUTTON</button>
      <p>primary small button</p>
      <button className="btn-primary-small">BUTTON</button>
      <p>secondary small button</p>
      <button className="btn-secondary-small">BUTTON</button>

      <br />
      <br />
      <br />

      {/* <ImageUploader
        accept={{ "image/png": [".png", ".webp", ".jpeg", ".jpg"] }}
        returnFiles={returnFiles}
      /> */}
    </ContainerGray>
  );
};

export default FigrmaComponents;
