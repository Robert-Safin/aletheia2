import NewSingleEventForm, { NewSingleEventFormkikData } from "@/components/management/new activity forms/NewSingleEventForm";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
  };
}

const createNewSingleEvent = async (values: NewSingleEventFormkikData, base64: String[]) => {
  'use server'
  console.log(base64);
  console.log(values);
}

const NewSingleEventPage: FC<Props> = (props) => {
  return (
    <ContainerGray>
      <BackLink
        href={`/management/${props.params.venueId}`}
        name="Back to venue"
      />
      <NewSingleEventForm createNewSingleEvent={createNewSingleEvent} />
    </ContainerGray>
  );
};

export default NewSingleEventPage;
