import { jomhuria } from "@/app/layout";
import { FC } from "react";

interface Props {
  title: string;
}

export const MainHeader:FC<Props> = (props) => {
  return (
    <h2 className={`text-4xl text-white tracking-wide ${jomhuria.className}`}>{props.title}</h2>
  )
}




export const SecondaryHeader:FC<Props> = (props) => {
  return (
    <h3 className="text-base text-white mt-2">{props.title}</h3>
  )
}
