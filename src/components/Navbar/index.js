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
                
                <Link href='/'>
                    <Image
                        src='/logo.svg'
                        width={90}
                        height={43}
                        alt='logo'
                    />  
                </Link>
                <ul className='xl:flex hidden text-small gap-7'>
                    {navOptions.map((link) => (
                        <Link href={link.path} key={link.id}>
                            {link.label}
                        </Link>
                    ))}
                </ul>
            </div>

            <div className='flexCenter gap-4'>
                {
                    isAuthUser ? (
                        <>
                            <div className="group relative">
                                <Avatar className="hover-effect" textSizeRatio={1.75} name={user.name} size="40" round={true} />
                                {isAuthUser && (
                                    <div className="opacity-0 invisible absolute top-full right-0 group-hover:opacity-100 group-hover:visible">
                                        <div className="user-dropdown my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                            <div className="px-4 py-3">
                                                <span className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                                            </div>
                                            <ul className="py-2" aria-labelledby="user-menu-button">
                                                <li>
                                                    <a href="./Profile" className="dropDown">Account Settings</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="dropDown">Earnings</a>
                                                </li>
                                                <li>
                                                    <a href="#" onClick={handleLogout} className="dropDown">Sign out</a>
                                                </li>
                                            </ul>  
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            
                            <div className='hidden xl:block'>
                                <a href="/login" className="rounded xl:text-black text-white font-semibold p-3">Login</a>
                            </div>
                        </>
                    )
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
                        <Link href='/'>
                            <Image
                                src='/logo.svg'
                                width={80}
                                height={40}
                                alt='logo'
                            />
                        </Link>
                        <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navOptions.map((item) => (
                                    <button key={item.id} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                            <div className="py-6">
                                {
                                    isAuthUser ? (
                                        <>
                                            <div className=''>
                                                <a href="/addWork" className="text-white font-semibold text-sm p-4 bg-customButtonColorDark rounded-lg">Add Work</a>
                                            </div>  
                                        </>
                                    ) : (
                                        <>
                                            <a href="/login" className="text-black font-semibold">Log in</a>
                                        </>
                                    )
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