import { FC } from "react"
import {AiOutlineHome} from 'react-icons/ai'
import {ImMap2} from 'react-icons/im'
import {LuSettings2} from 'react-icons/lu'

const Navbar:FC = () => {
  return (
    <div className="container flex items-center justify-evenly fixed bottom-0 py-4 rounded-t-xl bg-grayPrimary">
      <AiOutlineHome className="icon-large"/>
      <ImMap2 className="icon-large"/>
      <LuSettings2 className="icon-large"/>
    </div>
  )
}

export default Navbar
