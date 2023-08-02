import ContainerGray from "@/components/ui/containers/ContainerGray";

import Link from "next/link";
import { FC } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineArrowCircleRight } from "react-icons/md";

const SettingsPage: FC = async () => {
  return (
    <ContainerGray>
      <div className="flex-row space-y-4 mt-8">
        <h2 className="secondary-header">Account</h2>

        <Link href={`#`} className="flex items-center justify-between">
          <p className="paragraph">Claimed Events</p>
          <MdKeyboardArrowRight className="text-white text-3xl" />
        </Link>

        <Link href={`#`} className="flex items-center justify-between">
          <p className="paragraph">Event History</p>
          <MdKeyboardArrowRight className="text-white text-3xl" />
        </Link>
      </div>

      <div className="border border-white my-8"></div>

      <div className="flex-row space-y-4">
        <h2 className="secondary-header">More</h2>

        <Link href={`#`} className="flex items-center justify-between">
          <p className="paragraph">About</p>
          <MdKeyboardArrowRight className="text-white text-3xl" />
        </Link>

        <Link href={`#`} className="flex items-center justify-between">
          <p className="paragraph">Feedback</p>
          <MdKeyboardArrowRight className="text-white text-3xl" />
        </Link>
      </div>

      <Link
        href={`/management//registerVenue`}
        className="bg-[#373737] rounded-md mx-4 p-8 mt-8 flex items-center justify-between"
      >
        <div className="flex-col space-y-4">
          <h2 className="secondary-header">FOR BUSINESS</h2>
          <p className="paragraph">Register your venue</p>
        </div>
        <MdOutlineArrowCircleRight className="text-white text-4xl" />
      </Link>
    </ContainerGray>
  );
};

export default SettingsPage;
