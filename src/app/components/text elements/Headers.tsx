import { FC } from "react";

interface Props {
  title: string;
}

export const MainHeader:FC<Props> = (props) => {
  return (
    <h2 className="text-xl text-white">{props.title}</h2>
  )
}




export const SecondaryHeader:FC<Props> = (props) => {
  return (
    <h3 className="text-base text-white">{props.title}</h3>
  )
}
