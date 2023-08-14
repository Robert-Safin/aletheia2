import { FC } from "react";



interface Props {
  params: {
    venueId: string;
  };
}


const VenuePage:FC<Props> = (props) => {
  return (
    <div>
      <h1>VenuePage</h1>
      <p>{props.params.venueId}</p>
    </div>
  );
}

export default VenuePage;
