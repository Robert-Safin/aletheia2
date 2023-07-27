import { FC, ReactElement } from "react";
import { BigIcon } from "../icons/Icons";
import { MainHeader } from "../text elements/Headers";

interface Props {
  children: JSX.Element[] | JSX.Element
  icon: ReactElement
}

const XScrollContainer:FC<Props> = (props) => {
  return (
    <div className="bg-grayPrimary rounded-md">

      <div className="flex items-center">
        <BigIcon icon={props.icon}/>
        <MainHeader title="Venue near"/>
      </div>

      <div className="">
      {props.children}
      </div>

    </div>
  )
}

export default XScrollContainer
