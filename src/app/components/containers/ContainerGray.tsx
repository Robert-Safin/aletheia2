import { FC } from "react";

interface Props {
  children: React.ReactNode;


}

const ContainerGray:FC<Props> = (props) => {
  return (
    <div className="container bg-grayPrimary p-2">
      {props.children}
    </div>
  )
}

export default ContainerGray;
