"use client";
import { FC, ReactElement } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { PlacesType, Tooltip } from "react-tooltip";

interface Props {
tooltipId: string;
position: PlacesType;
content: ReactElement
}

const ToolTip: FC<Props> = (props) => {
  return (
    <>
      <AiOutlineInfoCircle className="icon-small ml-1" data-tooltip-id={props.tooltipId} />
      <Tooltip
        id={props.tooltipId}
        place={props.position}
        clickable={true}
      >
        {props.content}
      </Tooltip>
    </>
  );
};

export default ToolTip;
