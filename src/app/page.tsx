import { SignIn, currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { SignOutButton } from "@clerk/nextjs";
import ContainerGray from '@/components/ui/containers/ContainerGray';


const RootPage = async() => {
  // const user = await currentUser();
  // console.log(user);



  return (
    <ContainerGray>
    <Link className='btn-primary-wide' href={`/signin`}>Sign in</Link>

    <Link className='btn-primary-wide' href={`/signup`}>Sign up</Link>

    </ContainerGray>
  )
}

export default RootPage
