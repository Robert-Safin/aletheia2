'use client'
import { FC } from 'react'

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'next/image';
import { VenuePhoto } from '@prisma/client';


interface Props {
  photos: VenuePhoto[]
}

const ImageCarousel:FC<Props> = (props) => {


  return (
    <Carousel infiniteLoop={true} autoPlay={true} interval={3000} showThumbs={false}>
    {props.photos.map((photo, index) => (
      <div key={index}>
        <Image className="img-large" src={photo.cloudinaryUrl} alt={`photo`} width={1000} height={1000} />
      </div>
    ))}
  </Carousel>
  )

}

export default ImageCarousel
