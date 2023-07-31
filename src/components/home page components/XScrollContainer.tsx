import { FC, ReactElement } from "react";
import { MainHeader } from "../ui/text elements/Headers";
interface Props {
  children: JSX.Element[] | JSX.Element;
  icon : ReactElement
  category : string
}

const XScrollContainer: FC<Props> = (props) => {
  return (
    <div className="bg-grayPrimary rounded-md h-[266px] m-2 p-2">
      <div className="flex items-center space-x-4">
        {props.icon}
        <MainHeader title={props.category}/>
      </div>
      <div className="">{props.children}</div>
    </div>
  );
};

export default XScrollContainer;
