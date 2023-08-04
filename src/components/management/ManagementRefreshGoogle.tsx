'use client'
import { useRouter } from "next/navigation"
import { FC, useState, useTransition } from "react"
import LoadingButton from "../ui/loading spinner/LoadingButton"
import ToolTip from "../ui/tooltip/Tooltip"

interface Props {
  refreshGoogleData: (venueId:number) => Promise<void>
  venueId: number

}

const ManagementRefreshGoogle:FC<Props> = (props) => {
  const [isPending, startTransition] = useTransition()
  const [buttonLoading, setButtonIsLoading] = useState(false)
  const router = useRouter()

  const handleRefreshGoogleData = async () => {
    setButtonIsLoading(true)
    startTransition(()=> props.refreshGoogleData(props.venueId))
    router.refresh()
  }

    return (
        <div className="px-2">
          <div className="flex items-center mb-1">
            <h1 className="secondary-header">Refresh Google Data</h1>
            <ToolTip tooltipId="google" position="bottom" content={
              <p className="small-text w-60">
                If you have recently updated your google listing, you can use update the following data from google:
                <br />
                <br /> Name
                <br /> Address
                <br /> Phone Number
                <br /> Website
                <br /> Wokring Hours
                <br /> Average Rating
                <br /> Total Reviews

              </p>
            }/>
          </div>
            <button onClick={handleRefreshGoogleData} className="btn-secondary-wide">
            {buttonLoading ? <LoadingButton type="primary"/> : "UPDATE"}
              </button>
        </div>
    )
}


export default ManagementRefreshGoogle
