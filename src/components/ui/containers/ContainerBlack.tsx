import { FC } from "react";

interface Props {
  children: React.ReactNode;


}

const ContainerBlack:FC<Props> = (props) => {
  return (
    <div className="container bg-black min-h-screen w-full p-2">
      {props.children}
    </div>
  )
}

export default ContainerBlack;
