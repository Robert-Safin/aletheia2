import ContainerGray from "@/components/ui/containers/ContainerGray";
import UnauthorizedScreen from "@/components/ui/unauthorized/Unauthorized";
import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { FC } from "react"

interface Props {
  params: {
    venueId: string
  }
}
const isOwner = async (venueId: number, userClerkId: string) => {
  const prisma = new PrismaClient();
  const venues = await prisma.venue.findMany({
    where: {
      clerkId: userClerkId,
    },
  });
  await prisma.$disconnect();

  if (venues.length === 0) {
    return false;
  }

  for (let venue of venues) {
    if (venue.id === venueId) {
      return true;
    }
  }
  return false;


};

const UpdateVenuePhotosPage:FC<Props> = async(props) => {
  const user = await currentUser();
  const userClerkId = user?.id;

  const isOwnerResult = await isOwner(
    Number(props.params.venueId),
    userClerkId!
  );

  if (!isOwnerResult) {
    return <UnauthorizedScreen />;
  }

  return (
    <ContainerGray>
      {props.params.venueId}

    </ContainerGray>
  )
}


export default UpdateVenuePhotosPage
