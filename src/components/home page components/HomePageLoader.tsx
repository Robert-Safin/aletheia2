"use client";
import { FC } from "react";
import ContainerBlack from "../ui/containers/ContainerBlack";
import SearchBar from "./SearchBar";
import XScrollContainer from "./XScrollContainer";
import { AiOutlineTag } from "react-icons/ai";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { LuVerified } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";

const HomePageLoader: FC = () => {
  return (
    <>
      <SearchBar />
      <XScrollContainer
        category="Offers Today"
        icon={<AiOutlineTag className="icon-large" />}
      >
        <HomePagePulseContainer />
      </XScrollContainer>

      <XScrollContainer
        category="Events Today"
        icon={<BsCalendar2WeekFill className="icon-large" />}
      >
        <HomePagePulseContainer />
      </XScrollContainer>

      <XScrollContainer
        category="Top rated places near you"
        icon={<LuVerified className="icon-large" />}
      >
        <HomePagePulseContainer />
      </XScrollContainer>

      <XScrollContainer
        category="Upcoming offers"
        icon={<AiOutlineTag className="icon-large" />}
      >
        <HomePagePulseContainer />
      </XScrollContainer>

      <XScrollContainer
        category="Upcoming events"
        icon={<BsCalendar2WeekFill className="icon-large" />}
      >
        <HomePagePulseContainer />
      </XScrollContainer>

      <XScrollContainer
        category="Places close to you"
        icon={<IoLocationOutline className="icon-large" />}
      >
        <HomePagePulseContainer />
      </XScrollContainer>
    </>
  );
};

export default HomePageLoader;

const HomePagePulseContainer: FC = () => {
  return (
    <>
    <div className="flex flex-col space-y-1">
    <div className="animate-pulse w-[140px] h-[140px] bg-gray-600 rounded-md"/>
    <div className="animate-pulse w-full h-[20px] bg-gray-700"/>
    <div className="animate-pulse w-2/3 h-[10px] bg-gray-700"/>
    <div className="animate-pulse w-1/2 h-[10px] bg-gray-700"/>
    </div>
    <div className="flex flex-col space-y-1">
    <div className="animate-pulse w-[140px] h-[140px] bg-gray-600 rounded-md"/>
    <div className="animate-pulse w-full h-[20px] bg-gray-700"/>
    <div className="animate-pulse w-2/3 h-[10px] bg-gray-700"/>
    <div className="animate-pulse w-1/2 h-[10px] bg-gray-700"/>
    </div>
    <div className="flex flex-col space-y-1">
    <div className="animate-pulse w-[140px] h-[140px] bg-gray-600 rounded-md"/>
    <div className="animate-pulse w-full h-[20px] bg-gray-700"/>
    <div className="animate-pulse w-2/3 h-[10px] bg-gray-700"/>
    <div className="animate-pulse w-1/2 h-[10px] bg-gray-700"/>
    </div>
    <div className="flex flex-col space-y-1">
    <div className="animate-pulse w-[140px] h-[140px] bg-gray-600 rounded-md"/>
    <div className="animate-pulse w-full h-[20px] bg-gray-700"/>
    <div className="animate-pulse w-2/3 h-[10px] bg-gray-700"/>
    <div className="animate-pulse w-1/2 h-[10px] bg-gray-700"/>
    </div>
    <div className="flex flex-col space-y-1">
    <div className="animate-pulse w-[140px] h-[140px] bg-gray-600 rounded-md"/>
    <div className="animate-pulse w-full h-[20px] bg-gray-700"/>
    <div className="animate-pulse w-2/3 h-[10px] bg-gray-700"/>
    <div className="animate-pulse w-1/2 h-[10px] bg-gray-700"/>
    </div>
    <div className="flex flex-col space-y-1">
    <div className="animate-pulse w-[140px] h-[140px] bg-gray-600 rounded-md"/>
    <div className="animate-pulse w-full h-[20px] bg-gray-700"/>
    <div className="animate-pulse w-2/3 h-[10px] bg-gray-700"/>
    <div className="animate-pulse w-1/2 h-[10px] bg-gray-700"/>
    </div>
    <div className="flex flex-col space-y-1">
    <div className="animate-pulse w-[140px] h-[140px] bg-gray-600 rounded-md"/>
    <div className="animate-pulse w-full h-[20px] bg-gray-700"/>
    <div className="animate-pulse w-2/3 h-[10px] bg-gray-700"/>
    <div className="animate-pulse w-1/2 h-[10px] bg-gray-700"/>
    </div>
    <div className="flex flex-col space-y-1">
    <div className="animate-pulse w-[140px] h-[140px] bg-gray-600 rounded-md"/>
    <div className="animate-pulse w-full h-[20px] bg-gray-700"/>
    <div className="animate-pulse w-2/3 h-[10px] bg-gray-700"/>
    <div className="animate-pulse w-1/2 h-[10px] bg-gray-700"/>
    </div>
    <div className="flex flex-col space-y-1">
    <div className="animate-pulse w-[140px] h-[140px] bg-gray-600 rounded-md"/>
    <div className="animate-pulse w-full h-[20px] bg-gray-700"/>
    <div className="animate-pulse w-2/3 h-[10px] bg-gray-700"/>
    <div className="animate-pulse w-1/2 h-[10px] bg-gray-700"/>
    </div>
    <div className="flex flex-col space-y-1">
    <div className="animate-pulse w-[140px] h-[140px] bg-gray-600 rounded-md"/>
    <div className="animate-pulse w-full h-[20px] bg-gray-700"/>
    <div className="animate-pulse w-2/3 h-[10px] bg-gray-700"/>
    <div className="animate-pulse w-1/2 h-[10px] bg-gray-700"/>
    </div>
    <div className="flex flex-col space-y-1">
    <div className="animate-pulse w-[140px] h-[140px] bg-gray-600 rounded-md"/>
    <div className="animate-pulse w-full h-[20px] bg-gray-700"/>
    <div className="animate-pulse w-2/3 h-[10px] bg-gray-700"/>
    <div className="animate-pulse w-1/2 h-[10px] bg-gray-700"/>
    </div>
    </>

  )
};
