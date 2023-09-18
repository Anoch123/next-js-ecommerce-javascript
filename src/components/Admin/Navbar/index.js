"use client";

import React, { useContext } from 'react'
import { navOptions } from "@/utils";
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react'
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { GlobalContext } from '@/context';
import Avatar from 'react-avatar';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const {user, isAuthUser, setIsAuthUser, setUser} = useContext(GlobalContext);

    const router = useRouter();

    const handleLogout = () => {
        setIsAuthUser(false);
        setUser(null);
        Cookies.remove("token");
        localStorage.clear();
        router.push("/");
    }

  return (
    <>
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link href='/admin'>
                    <h1 className='font-bold'>ABCD PVT LTD</h1>
                </Link>
            </div>

            <div className='flexCenter gap-4'>
                {
                    isAuthUser ? (
                        <>
                            {isAuthUser && (
                                <li className='hidden xl:block'>
                                    <a href="#" onClick={handleLogout} className="dropDowns">Sign out</a>
                                </li>
                            )}
                        </>
                    ) : null
                }
                <div className="flex lg:hidden">
                    <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md text-gray-700" onClick={() => setMobileMenuOpen(true)}>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </div>
        
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href='/admin'>
                            <h1 className='font-bold'>ABCD PVT LTD</h1>
                        </Link>
                        <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="py-6">
                                {
                                    isAuthUser ? (
                                        <>
                                            {isAuthUser && (
                                                <li>
                                                    <a href="#" onClick={handleLogout} className="dropDowns">Sign out</a>
                                                </li>
                                            )}
                                        </>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </nav>
    </>
  )
}

export default Navbar