import VenueInfoCard from "@/components/VenueInfoCard/VenueInfoCard";
import BackLink from "@/components/ui/back link/BackLink";
import ContainerBlack from "@/components/ui/containers/ContainerBlack";
import ImageCarousel from "@/components/ui/image carousel/ImageCarousel";
import { PrismaClient } from "@prisma/client";
import { FC } from "react";

interface Props {
  params: {
    venueId: string;
    singleOfferId: string;
  };
}

const fetchSingleOffer = async (singleOfferId: string) => {
  const prisma = new PrismaClient();
  const singleOffer = await prisma.singleOffer.findUnique({
    where: {
      id: Number(singleOfferId),
    },
    include: {
      singleOfferPhoto: true,
      venue: {
        include: {
          venuePhotos: true,
        }
      },
    },
  });
  return singleOffer;
}


const ShowSingleOfferPage: FC<Props> = async(props) => {
  const singleOffer = await fetchSingleOffer(props.params.singleOfferId);
  const formatDate = new Date(singleOffer!.date).toLocaleDateString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  })

  return (
    <ContainerBlack>
      <BackLink href="/home" name="Home" />
      <div className="bg-grayPrimary rounded-md p-4">
        <h1 className="main-header mb-2">{singleOffer?.name}</h1>
        <ImageCarousel photos={singleOffer!.singleOfferPhoto}/>
        <div className="flex my-4">
          <div className="w-full space-y-2">
            <div>
            <p className="paragraph">Location:</p>
            <p className="small-text line-clamp-1">{singleOffer?.venue.name}</p>
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
              <p className="small-text">{singleOffer?.timeStart} - {singleOffer?.timeEnd}</p>
            </div>
          </div>
        </div>
        <p className="paragraph">{singleOffer?.description}</p>
      </div>
      <div className="flex py-2 space-x-2">
        <button className="btn-secondary-wide">SHARE</button>
        <button className="btn-primary-wide">CLAIM</button>
      </div>
      <VenueInfoCard venue={singleOffer!.venue!}/>
    </ContainerBlack>
  );
};

export default ShowSingleOfferPage;
