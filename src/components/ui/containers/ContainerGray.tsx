import { FC } from "react";

interface Props {
  children: React.ReactNode;


}

const ContainerGray:FC<Props> = (props) => {
  return (
    <div className="container rounded-md bg-grayPrimary p-2 mx-auto h-full">
      {props.children}
    </div>
  )
}

export default ContainerGray;
