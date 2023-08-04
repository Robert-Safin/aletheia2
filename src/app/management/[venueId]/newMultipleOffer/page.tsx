import NewMultipleOfferForm from "@/components/management/new activity forms/NewMultipleOfferForm";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerGray from "@/components/ui/containers/ContainerGray";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
  };
}

const NewMultipleOfferPage: FC<Props> = (props) => {
  return (
    <ContainerGray>
      <BackLink
        href={`/management/${props.params.venueId}`}
        name="Back to venue"
      />
      <NewMultipleOfferForm />
    </ContainerGray>
  );
};

export default NewMultipleOfferPage;
