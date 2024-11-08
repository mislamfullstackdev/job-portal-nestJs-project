"use client";
import { useLocalStorage } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Navbar() {
  const router = useRouter();
  // use local storage
  const [user, setUser] = useLocalStorage({
    key: 'userData',
    defaultValue: {},
  });
  console.log("user?.user", user?.user)
  return (
    <div className='text-white'>
        <div className="flex items-center justify-between px-5 mx-auto max-w-7xl h-16">
            <div className="">
                <Link href="/">
                <h1 className='text-2xl font-bold'>
                    Job <span className='text-yellow-400'>Portal</span>
                </h1>
                </Link>
            </div>
            <div>
                <ul className='flex font-medium items-center gap-5'>
                    <li className='hover:text-yellow-400 duration-300 cursor-pointer'>
                        <Link href='./dashboard/companies'>Companies</Link>
                    </li>
                    <li className='hover:text-yellow-400 duration-300 cursor-pointer'>
                        <Link href='./dashboard/Jobs'>Jobs</Link>
                    </li>

                    <li className='hover:text-yellow-400 duration-300 cursor-pointer'>
                        <Link href='/'>Home</Link>
                    </li>
                    <li className='hover:text-yellow-400 duration-300 cursor-pointer'>
                        <Link href='/findjobs'>Find Jobs</Link>
                    </li>
                    <li className='hover:text-yellow-400 duration-300 cursor-pointer'>
                        <Link href='/dashboard/favorite'>Favorites</Link>
                    </li>
                    <li className='hover:text-yellow-400 duration-300 cursor-pointer'>
                        <Link href='/profile'>Profile</Link>
                    </li>
                    <li className='hover:text-yellow-400 duration-300 cursor-pointer'>
                        Logout
                    </li>
                    <li className='hover:text-yellow-400 duration-300 cursor-pointer'>
                        <Link href='/login'>Login</Link>
                    </li>
                    <li className='hover:text-yellow-400 duration-300 cursor-pointer'>
                        <Link href='/register'>SignUp</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
