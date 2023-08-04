'use client'
import ContainerGray from "@/components/ui/containers/ContainerGray";
import LoadingButton from "@/components/ui/loading spinner/LoadingButton";
import LoadingSpinner from "@/components/ui/loading spinner/LoadingSpinner";
import ToolTip from "@/components/ui/tooltip/Tooltip";

import { AiTwotoneStar } from "react-icons/ai";

const FigrmaComponents =  () => {


  return (
    <ContainerGray>

      <h1 className="main-header">main header</h1>
      <h2 className="secondary-header">secondary header</h2>
      <p className="paragraph">paragraph</p>
      <p className="small-text">small text</p>
      <AiTwotoneStar className="icon-large"/>
      <AiTwotoneStar className="icon-small"/>

      <p>primary wide button</p>
      <button className="btn-primary-wide">BUTTON</button>
      <p>secondary wide button</p>
      <button className="btn-secondary-wide">BUTTON</button>
      <p>primary small button</p>
      <button className="btn-primary-small">BUTTON</button>
      <p>secondary small button</p>
      <button className="btn-secondary-small">BUTTON</button>


  <br />
  <br />
  <br />

  <ToolTip tooltipId="1" position="right" content={ <p className="paragraph">hi mum</p> }/>


    </ContainerGray>
  );
};

export default FigrmaComponents;
