
import ContainerGray from "@/components/ui/containers/ContainerGray";
import { SecondaryHeader } from "@/components/ui/text elements/Headers";
import { Paragraph } from "@/components/ui/text elements/Texts";
import Link from "next/link";
import { FC } from "react";
import {MdKeyboardArrowRight} from "react-icons/md";
import {MdOutlineArrowCircleRight} from "react-icons/md";

const SettingsPage:FC = async() => {
  return (
    <ContainerGray>



      <div className="flex-row space-y-4 mt-8">

          <SecondaryHeader title="Account"/>

          <Link href={`#`} className="flex items-center justify-between">
          <Paragraph content="Claimed Events"/>
          <MdKeyboardArrowRight className="text-white text-3xl"/>
          </Link>

          <Link href={`#`} className="flex items-center justify-between">
          <Paragraph content="Event History"/>
          <MdKeyboardArrowRight className="text-white text-3xl"/>
          </Link>

      </div>

      <div className="border border-white my-8"></div>



      <div className="flex-row space-y-4">

      <SecondaryHeader title="More"/>

          <Link href={`#`} className="flex items-center justify-between">
          <Paragraph content="About"/>
          <MdKeyboardArrowRight className="text-white text-3xl"/>
          </Link>

          <Link href={`#`} className="flex items-center justify-between">
          <Paragraph content="Feedback"/>
          <MdKeyboardArrowRight className="text-white text-3xl"/>
          </Link>

      </div>






      <Link href={`/registerVenue`} className="bg-[#373737] rounded-md mx-4 p-8 mt-8 flex items-center justify-between">
        <div className="flex-col space-y-4">
          <SecondaryHeader title="FOR BUSINESS"/>
          <Paragraph content="Register your venue"/>
        </div>
        <MdOutlineArrowCircleRight className="text-white text-4xl"/>

      </Link>



    </ContainerGray>
  );
}


export default SettingsPage;
