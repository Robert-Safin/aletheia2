import React, { FC, ReactElement} from "react";




interface Props {
  icon: ReactElement
}



export const SmallIcon:FC<Props> = (props) => {
    const iconWithClass = React.cloneElement(props.icon, {
    className: "text-xs text-white"
  });
  return iconWithClass;
}


export const BigIcon:FC<Props> = (props) => {
    const iconWithClass = React.cloneElement(props.icon, {
    className: "text-2xl text-white"
  });
  return iconWithClass;
}
