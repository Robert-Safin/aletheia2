import { FC, ReactElement } from "react";
interface Props {
  children: JSX.Element[] | JSX.Element;
  icon: ReactElement;
  category: string;
}

const XScrollContainer: FC<Props> = (props) => {
  return (
    <div className="bg-grayPrimary rounded-md p-2 mb-2">
      <div className="flex items-center space-x-4 mb-2">
        {props.icon}
        <h1 className="main-header">{props.category}</h1>
      </div>
      <div className="flex space-x-4 w-full overflow-x-auto">{props.children}</div>
    </div>
  );
};

export default XScrollContainer;
