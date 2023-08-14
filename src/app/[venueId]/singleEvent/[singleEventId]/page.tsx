import ContainerGray from "@/components/ui/containers/ContainerGray";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
    singleEventId: string;
  };
}


const ShowSingleEventPage:FC<Props> = (props) => {
  return (
    <ContainerGray>
      <h1>Show single Event Page</h1>
      <p>offer{props.params.singleEventId}</p>
      <p>venue{props.params.venueId}</p>
    </ContainerGray>
  )
}

export default ShowSingleEventPage;
