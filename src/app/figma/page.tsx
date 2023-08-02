import ContainerGray from "@/components/ui/containers/ContainerGray";

import { AiTwotoneStar } from "react-icons/ai";

const FigrmaComponents = async () => {


  return (
    <ContainerGray>

      <h1 className="main-header">main header</h1>
      <br />
      <h2 className="secondary-header">secondary header</h2>
      <br />
      <p className="paragraph">paragraph</p>
      <br />
      <p className="small-text">small text</p>
      <br />
      <AiTwotoneStar className="icon-large"/>
      <br />
      <AiTwotoneStar className="icon-small"/>
      <br />

      <p>primary wide button</p>
      <button className="btn-primary-wide">BUTTON</button>
      <br />
      <br />
      <p>secondary wide button</p>
      <button className="btn-secondary-wide">BUTTON</button>
      <br />
      <br />
      <p>primary small button</p>
      <button className="btn-primary-small">BUTTON</button>
      <br />
      <br />
      <p>secondary small button</p>
      <button className="btn-secondary-small">BUTTON</button>
      <br />
      <br />



    </ContainerGray>
  );
};

export default FigrmaComponents;
