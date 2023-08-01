import { FC } from "react";

interface Props {
  children: React.ReactNode;


}

const ContainerBlack:FC<Props> = (props) => {
  return (
    <div className="container bg-black p-2 h-full">
      {props.children}
    </div>
  )
}

export default ContainerBlack;
