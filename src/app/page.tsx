'use client'
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";


const RootPage = () => {
  const session = useSession()
  const [listings, setListings] = useState([])
  console.log(session);

  const fetchListings = async () => {
    const data = {
      accessToken: session.data.accessToken
    }
    const response = await fetch("/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

  }

  //console.log(session.data.accessToken);


  return (
    <>
    <button onClick={()=>signIn()}>log in</button>
    <button onClick={()=>fetchListings()}>Fetch</button>


    </>
  )
}

export default RootPage
