import RatingToStars from "@/components/ui/icons/RatingToStars";
import UnauthorizedScreen from "@/components/ui/unauthorized/Unauthorized";
import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import { HiOutlineExternalLink, HiOutlineTag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
interface Props {
  params: {
    venueId: string;
  };
}

const ManagementViewVenuePage: FC<Props> = async (props) => {
  const user = await currentUser();
  const userClerkId = user?.id;

  const isOwnerResult = await isOwner(
    Number(props.params.venueId),
    userClerkId!
  );

  if (!isOwnerResult) {
    return <UnauthorizedScreen />;
  }

  const venue = await findVenue(Number(props.params.venueId));

  return (
    <div className="bg-grayPrimary h-screen">
      <Link href={"/management"} className="flex items-end space-x-4 py-4 pl-2">
        <IoIosArrowBack className="icon-large" />
        <h1 className="secondary-header">Your venues</h1>
      </Link>

      <div className="container bg-grayPrimary h-max pb-16 px-4">
        <Image
          className="img-large mx-auto"
          src={venue!.photos[0].cloudinaryUrl}
          alt="photo"
          width={1000}
          height={1000}
        />
        <h1 className="main-header mt-2">{venue?.name}</h1>
        <div className="flex items-center mt-2 mb-1">
          <RatingToStars rating={venue!.averageRating} />
          <p className="small-text ml-2">{venue?.totalReviews} reviews</p>
        </div>

        <div className="flex space-x-4">
          <div className="flex space-x-2 items-center">
            <BsCalendar2WeekFill className="icon-small" />
            <p className="small-text">x events</p>
          </div>
          <div className="flex space-x-2 items-center">
            <FaTags className="icon-small" />
            <p className="small-text">x offers</p>
          </div>
        </div>

        <h2 className="secondary-header mt-4 mb-1">About:</h2>
        <p className="paragraph">
          {venue?.description ? venue.description : "No description"}
        </p>

        <h2 className="secondary-header mt-4 mb-1">Address:</h2>
        <p className="paragraph">{venue?.formattedAdress}</p>

        <h2 className="secondary-header mt-4 mb-1">Phone:</h2>
        <p className="paragraph">{venue?.formattedPhoneNumber}</p>

        <h2 className="secondary-header mt-4 mb-1">Website:</h2>
        {venue?.website ? (
          <div>
            <Link
              href={venue?.website!}
              className="flex space-x-2 items-center"
            >
              <HiOutlineExternalLink className="icon-small" />
              <p className="small-text">open link</p>
            </Link>
          </div>
        ) : (
          <p className="paragraph">No website</p>
        )}

        <h2 className="secondary-header mt-4 mb-1">Categories:</h2>

        <div className="flex flex-wrap whitespace-nowrap">
          {venue?.categories?.split(",").map((category, index) => (
            <p className="category" key={index}>
              {category}
            </p>
          ))}
        </div>
        <div className="flex justify-between space-x-2 mt-4">
        <button className="btn-primary-small w-full">NEW OFFER</button>
        <button className="btn-primary-small w-full">NEW EVENT</button>
        </div>
        <button className="btn-secondary-wide mt-2 mb-4">UPDATE</button>


        <div className="flex space-x-2 items-center">
        <HiOutlineTag className='icon-large'/>
          <h1 className="main-header">Offers</h1>
        </div>
        <div className="flex space-x-2 items-center">
          <AiOutlineCalendar className='icon-large'/>
          <h1 className="main-header">Events</h1>
        </div>

      </div>
    </div>
  );
};

export default ManagementViewVenuePage;

const isOwner = async (venueId: number, userClerkId: string) => {
  const prisma = new PrismaClient();
  const venues = await prisma.venue.findMany({
    where: {
      clerkId: userClerkId,
    },
  });

  for (let venue of venues) {
    if (venue.clerkId === userClerkId) {
      return true;
    } else {
      return false;
    }
  }
};

const findVenue = async (venueId: number) => {
  const prisma = new PrismaClient();
  const venue = await prisma.venue.findUnique({
    where: {
      id: venueId,
    },
    include: {
      photos: true,
    },
  });
  return venue;
};
