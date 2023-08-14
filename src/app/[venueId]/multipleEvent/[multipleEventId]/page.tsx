import ContainerGray from "@/components/ui/containers/ContainerGray";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
    multipleEventId: string;
  };
}


const ShowMultipleEventPage:FC<Props> = (props) => {
  return (
    <ContainerGray>
      <h1>Show multi Event Page</h1>
      <p>event{props.params.multipleEventId}</p>
      <p>venue{props.params.venueId}</p>
    </ContainerGray>
  )
}

export default ShowMultipleEventPage;
