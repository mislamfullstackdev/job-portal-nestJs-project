import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='fixed bottom-0 w-full border-t border-t-gray-400
        text-white py-2'>
            <div className='container mx-auto'>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className='text-xl font-bold'>Job Portal</h2>
                        <p className='text-sm'>© {currentYear} Job Portal, all rights reserved.</p>
                    </div>
                    <div className="flex space-x-4 md:mt-0">
                        <Link href="#" className='hover:font-hellow-400'>
                            <FaFacebook size={30} color="#4267B2" />
                        </Link>
                        <Link href="#">
                            <FaLinkedin size={30} color="#2867B2" />
                        </Link>
                        <Link href="#">
                            <FaTwitter size={30} color="#1DA1F2" />
                        </Link>
                        <Link href="#">
                            <FaInstagram size={30} color="#E4405F" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
