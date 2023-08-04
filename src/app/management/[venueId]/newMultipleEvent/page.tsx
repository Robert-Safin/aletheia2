import NewMultipleEventForm from "@/components/management/new activity forms/NewMultipleEventForm";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
  };
}

const NewMultipleEventPage: FC<Props> = (props) => {
  return (
    <ContainerGray>
      <BackLink
        href={`/management/${props.params.venueId}`}
        name="Back to venue"
      />
      <NewMultipleEventForm />
    </ContainerGray>
  );
};

export default NewMultipleEventPage;
