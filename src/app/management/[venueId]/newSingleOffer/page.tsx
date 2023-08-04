import NewSingleOfferForm from "@/components/management/new activity forms/NewSingleOfferForm";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
  };
}

const NewSingleEventPage: FC<Props> = (props) => {
  return (
    <ContainerGray>
      <BackLink
        href={`/management/${props.params.venueId}`}
        name="Back to venue"
      />
      <NewSingleOfferForm />
    </ContainerGray>
  );
};

export default NewSingleEventPage;
