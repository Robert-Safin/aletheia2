import { SignIn, currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { SignOutButton } from "@clerk/nextjs";
import ContainerGray from '@/components/ui/containers/ContainerGray';
import { PrismaClient } from '@prisma/client';


const RootPage = async() => {



  return (
    <ContainerGray>
    <Link className='btn-primary-wide' href={`/signin`}>Sign in</Link>

    <Link className='btn-primary-wide' href={`/signup`}>Sign up</Link>

    <SignOutButton/>

    </ContainerGray>
  )
}

export default RootPage
