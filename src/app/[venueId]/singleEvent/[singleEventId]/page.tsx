import VenueInfoCard from "@/components/VenueInfoCard/VenueInfoCard";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerBlack from "@/components/ui/containers/ContainerBlack";
import ImageCarousel from "@/components/ui/image carousel/ImageCarousel";
import { PrismaClient } from "@prisma/client";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
    singleEventId: string;
  };
}

const fetchSingleEvent = async (singleEventId: string) => {
  const prisma = new PrismaClient();
  const singleEvent = await prisma.singleEvent.findUnique({
    where: {
      id: Number(singleEventId),
    },
    include: {
      singleEventPhoto: true,
      venue: {
        include: {
          venuePhotos: true,
        }
      },
    },
  });
  return singleEvent;
}


const ShowSingleEventPage: FC<Props> = async(props) => {
  const singleEvent = await fetchSingleEvent(props.params.singleEventId);
  const formatDate = new Date(singleEvent!.date).toLocaleDateString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  })

  return (
    <ContainerBlack>
      <BackLink href="/home" name="Home" />
      <div className="bg-grayPrimary rounded-md p-4">
        <h1 className="main-header mb-2">{singleEvent?.name}</h1>
        <ImageCarousel photos={singleEvent!.singleEventPhoto}/>
        <div className="flex my-4">
          <div className="w-full space-y-2">
            <div>
            <p className="paragraph">Location:</p>
            <p className="small-text line-clamp-1">{singleEvent?.venue.name}</p>
            </div>
            <div>
              <p className="paragraph">Offers claimed:</p>
              <p className="small-text">NA</p>
            </div>
          </div>
          <div className="w-full space-y-2">
            <div>
            <p className="paragraph">Date:</p>
            <p className="small-text">{formatDate}</p>
            </div>
            <div>
              <p className="paragraph">Time:</p>
              <p className="small-text">{singleEvent?.timeStart} - {singleEvent?.timeEnd}</p>
            </div>
          </div>
        </div>
        <p className="paragraph">{singleEvent?.description}</p>
      </div>
      <div className="flex py-2 space-x-2">
        <button className="btn-secondary-wide">SHARE</button>
        <button className="btn-primary-wide">CLAIM</button>
      </div>
      <VenueInfoCard venue={singleEvent!.venue!}/>
    </ContainerBlack>
  );
};

export default ShowSingleEventPage;
