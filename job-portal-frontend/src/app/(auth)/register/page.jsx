"use client";
import FormInput from '@/components/FormInput'
import { SelectFrom } from '@/components/SelectFrom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

export default function Register() {
  const [profile, setProfile] = useState({profileBio: "", profilePhoto: "", })
  const [resume, setResume] = useState({
    profileResume: "", 
    profileResumeOriginalName: "",
  })
  return (
    <div className='flex items-center justify-center max-w-7xl mx-auto mb-12'>
        <form action='' className='w-1/2 border border-gray-200 rounded p-4 bg-gray-100 my-6'>
            <h2 className='font-bold text-2xl mb-4 text-yellow-400 text-center'>
                Sign Up
            </h2>
            <FormInput
                label="Full Name" 
                type="text"
                name="fullname"
                placeholder="Enter your name"
            />
            <FormInput
                label="Email" 
                type="email"
                name="email"
                placeholder="Enter your Email Address"
            />
            <FormInput
                label="Full Name" 
                type="text"
                name="fullname"
                placeholder="Enter your name"
            />
            <FormInput
                label="Phone Number" 
                type="text"
                name="phonenumber"
                placeholder="Enter your Phone Number"
            />
            <FormInput
                label="Password" 
                type="text"
                name="password"
                placeholder="Enter your password"
            />
            {profile?.profilePhoto?(
                <>
                <Label>Profile phonto</Label>
                    <div className="">
                        <Avatar>
                            <AvatarImage/>
                            <AvatarFallback>Profile photo</AvatarFallback>
                        </Avatar>
                        <X size={14} className='absolute -top-1 
                        -right-1 z-10 cursor-pointer'
                        onClick={()=>{setProfile({ 
                            profileResume: "", 
                            profileResumeOriginalName: ""
                        })}}
                        />
                    </div>
                </>
            ):(
                <FormInput
                label="Upload Photo" 
                type="file"
                name="picture"
                placeholder="Upload your photo"
                />
            )}
            <FormInput
                label="profile Skills" 
                type="text"
                name="profileSkills"
                placeholder="Enter your skills with commas"
            />
            {resume?.profileResume ?(
            <>
                <Label> Resume </Label>
                <div>
                    <object data={resume?.profileResume} type='application/pdf' width="50%" height="50%">
                        <p><a href={resume?.profileResume}>To the PDF</a></p>
                    </object>
                    <X size={14} className='absolute -top-1 
                        -right-1 z-10 cursor-pointer'
                        onClick={()=>{setResume({ profileBio: "", profilePhoto: ""})}}
                    />

                </div>
            </>
            ):(
                <FormInput
                    label="Upload Resume" 
                    type="file"
                    name="resume"
                />
            )}
            <SelectFrom name="role" placeholder="Select user role" list={["student","recruiter"]}/>
            <Button type="submit" className="w-full my-4 bg-yellow-400/90 hover:bg-yellow-400/100">Sign Up</Button>
            <span>Already have an account? <Link href="/login" className='text-yellow-400 font-bold'>Login</Link></span>
        </form>
    </div>
  )
}
