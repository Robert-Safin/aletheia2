import ContainerGray from "@/components/ui/containers/ContainerGray";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
    multipleOfferId: string;
  };
}


const ShowMultipleOfferPage:FC<Props> = (props) => {
  return (
    <ContainerGray>
      <h1>Show multi Offer Page</h1>
      <p>offer{props.params.multipleOfferId}</p>
      <p>venue{props.params.venueId}</p>
    </ContainerGray>
  )
}

export default ShowMultipleOfferPage;
