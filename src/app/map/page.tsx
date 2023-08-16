
import Map from "@/components/map components/Map"
import { PrismaClient } from "@prisma/client"
import { FC} from "react"
import { Coordinates } from "../home/page"


const MapPage:FC = async() => {

  const fetchVenues = async (userCoordinates:Coordinates) => {
    'use server'
    const prisma = new PrismaClient()
    const venues = await prisma.venue.findMany({
      include: {
        venuePhotos: true,
      }
    })
    await prisma.$disconnect()
    return venues
  }



    return (

    <Map fetchVenues={fetchVenues} />

    )
}


export default MapPage
