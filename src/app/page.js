'use client';

import Navbar from '@/components/Navbar'
import { GlobalContext } from '@/context';
import { useContext } from 'react';

export default function Home() {

  const {isAuthUser} = useContext(GlobalContext);
  console.log(isAuthUser)
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>E-Commerce website</h1>
      </main>
    </>
  )
}
