'use client';

import Navbar from '@/components/Navbar'
import { GlobalContext } from '@/context';
import { useContext } from 'react';

const Profile = () => {

    const {isAuthUser} = useContext(GlobalContext);
    
  return (
    <>
      <Navbar />
      <div>Profile</div>
    </>
    
  )
}

export default Profile