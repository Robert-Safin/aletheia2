"use client";
import { FC, useState } from "react";
import { ImSearch } from "react-icons/im";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { SearchParams } from "./HomePageResults";

interface Props {
  customSearch: (searchParams: SearchParams) => void;
}

const SearchBar: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [distanceKm, setDistanceKm] = useState<number>(20000);
  const [when, setWhen] = useState<"today" | "tomorrow">("today");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = () => {
    const searchParams: SearchParams = {
      distanceKm: distanceKm,
      searchTerm: searchTerm,
      when: when,
    };

    props.customSearch(searchParams);
  }


  return (
    <>
      {!isOpen && (
        <div
          onClick={() =>  setIsOpen(true)}
          className="flex items-center bg-white p-1 rounded-md mb-2"
        >
          <ImSearch className="text-2xl" />
          <input className="w-full pl-2" type="text" placeholder="Search" value={searchTerm} readOnly/>
        </div>
      )}
      {isOpen && (
        <div onMouseLeave={()=> setIsOpen(false)} className="bg-grayPrimary rounded-md p-2 mb-2">
          <div className="flex items-center bg-white p-1 rounded-md mb-2">
            <ImSearch className="text-2xl" />
            <input className="w-full pl-2" type="text" placeholder="Search" onChange={e=> setSearchTerm(e.target.value)}/>
          </div>
          {/* <p className="small-text my-2">When</p>
          <div className="flex">
            <p onClick={()=> setWhen("today")} className={when === "today" ? "category bg-actionPeach" : "category"}>Today</p>
            <p onClick={()=> setWhen("tomorrow")} className={when === "tomorrow" ? "category bg-actionPeach" : "category"}>Tomorrow</p>
          </div> */}
          <p className="small-text my-2">Max distance</p>
          <Slider
            min={1}
            max={20000}
            step={1}
            value={distanceKm}
            onChange={(event) => setDistanceKm(Number(event.valueOf()))}
            handleStyle={{
              backgroundColor: "#F87171",
              zIndex: 0,
              borderColor: "#F87171",
              opacity: 1,
            }}
            trackStyle={{ backgroundColor: "#F87171", zIndex: 0 }}
          />
          <p className="small-text text-center">{distanceKm} Km</p>
          <button onClick={handleSubmit} className="btn-primary-small w-full my-2">SEARCH</button>
        </div>
      )}
    </>
  );
};

export default SearchBar;
