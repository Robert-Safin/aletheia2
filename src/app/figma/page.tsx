import ContainerGray from "@/components/ui/containers/ContainerGray";
import { FormLabel, FormTextInput } from "@/components/ui/forms/FormComponents";
import {
  MainHeader,
  SecondaryHeader,
} from "@/components/ui/text elements/Headers";
import { Paragraph, SmallText } from "@/components/ui/text elements/Texts";
import { AiTwotoneStar } from "react-icons/ai";

const FigrmaComponents = async () => {


  return (
    <ContainerGray>

      <p>main header</p>
      <MainHeader title="main header" />
      <br />
      <p>secondary header</p>
      <SecondaryHeader title=" secondary header" />
      <br />
      <p>paragraph</p>
      <Paragraph content="paragraph" />
      <br />
      <p>small text</p>
      <SmallText content="text" />
      <br />
      <p>small icon</p>
      <AiTwotoneStar />
      <br />
      <p>big icon</p>
      <AiTwotoneStar />
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


      <p>Form Label</p>
      <FormLabel title="Label title"/>
      <br />

      <p>Form text input</p>
      <FormTextInput defaultValue="default value"/>
      <br />

    </ContainerGray>
  );
};

export default FigrmaComponents;
