"use client";

import { FC, useState } from "react";

interface Props {}

const CopyToClipboardButton: FC<Props> = (props) => {

  const [isClicked, setIsClicked] = useState(false);

  const copyURLToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false)
    }, 2000);
  };


  return <button className="btn-secondary-wide" onClick={copyURLToClipboard}>{isClicked? "COPIED" : "SHARE"}</button>;
};


export default CopyToClipboardButton;
