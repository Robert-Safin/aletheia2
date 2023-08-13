'use client'
import { FC } from "react"
import {ImSearch} from "react-icons/im"



const SearchBar:FC = () => {
    return (
        <div className="flex items-center bg-white p-1 rounded-md mb-2">
          <ImSearch className="text-2xl"/>
          <input className="w-full pl-2" type="text" placeholder="Search"/>
        </div>
    )
}

export default SearchBar
