'use client'
import { useRouter } from "next/navigation"
import { FC, useState, useTransition } from "react"
import LoadingButton from "../ui/loading spinner/LoadingButton"

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
            <h1 className="secondary-header mb-1">Refresh Google Data</h1>
            <button onClick={handleRefreshGoogleData} className="btn-secondary-wide">
            {buttonLoading ? <LoadingButton type="primary"/> : "UPDATE"}
              </button>
        </div>
    )
}


export default ManagementRefreshGoogle
