import ContainerGray from "@/components/ui/containers/ContainerGray";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
    singleOfferId: string;
  };
}


const ShowSingleOfferPage:FC<Props> = (props) => {
  return (
    <ContainerGray>
      <h1>Show single Offer Page</h1>
      <p>offer{props.params.singleOfferId}</p>
      <p>venue{props.params.venueId}</p>
    </ContainerGray>
  )
}

export default ShowSingleOfferPage;
