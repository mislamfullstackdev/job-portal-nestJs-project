"use client";
import { register } from '@/actions/user';
import FormInput from '@/components/FormInput'
import { SelectFrom } from '@/components/SelectFrom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks';
import uploadFile from '@/lib/uploadFile';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const [profile, setProfile] = useState({ profileBio: "", profilePhoto: "", })
    const [resume, setResume] = useState({
        profileResume: "",
        profileResumeOriginalName: "",
    })
    const [formData, setFormData] = useState({
        fullname: "", 
        email: "",
        phoneNumber: "",
        password: "",
        profileSkills: "",
        role: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // use local storage
    const [user] = useLocalStorage({
        key: 'userData',
        defaultValue: {},
    });
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const response = await register(formData, profile, resume);
        if (response?.error) {
            toast.error(response?.error);
        } else {
            router.push('/login');
        }
    }

    useEffect(() => {
        if (user?.role == "recruiter") {
            router?.push("/admin/companies");
        } else if (user?.role == "student") {
            router?.push("/login");
        }
    }, []);

    const handleUpload = async (event, type) => {
        const file = event.target.files?.[0]
        const name = file?.name?.split(".")?.[0];
        const upload = await uploadFile(file);
        console.log("upload", upload);
        if (type == "profile") {
            setProfile({ profileBio: name, profilePhoto: upload?.url })
            toast.success("Imagew uploaded successfully");
        } else {
            setResume({
                profileResume: upload?.url,
                profileResumeOriginalName: name,
            })
            toast.success("Resume uploaded successfully");
        }
    }
    return (
        <div className='flex items-center justify-center max-w-7xl mx-auto mb-12'>
            <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded p-4 bg-gray-100 my-6'>
                <h2 className='font-bold text-2xl mb-4 text-yellow-400 text-center'>
                    Sign Up
                </h2>
                <FormInput
                    label="Full Name"
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                />
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your Email Address"
                />

                <FormInput
                    label="Phone Number"
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your Phone Number"
                />
                <FormInput
                    label="Password"
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                />
                {profile?.profilePhoto ? (
                    <>
                        <Label>Profile phonto</Label>
                        <div className="h-20 w-20 relative">
                            <Avatar className="h-full w-full">
                                <AvatarImage src={profile?.profilePhoto} alt="Profile photo" />
                                <AvatarFallback>Profile photo</AvatarFallback>
                            </Avatar>
                            <X size={14} className='absolute -top-1 
                        -right-1 z-10 cursor-pointer text-red-400 hover:text-yellow-400'
                                onClick={() => {
                                    setProfile({
                                        profileResume: "",
                                        profileResumeOriginalName: ""
                                    })
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <FormInput
                        label="Upload Photo"
                        type="file"
                        name="picture"
                        placeholder="Upload your photo"
                        onChange={(event) => handleUpload(event, "profile")}
                    />
                )}
                <FormInput
                    label="Profile Skills"
                    type="text"
                    name="profileSkills"
                    value={formData.profileSkills}
                    onChange={handleInputChange}
                    placeholder="Enter your skills with commas"
                />
                {resume?.profileResume ? (
                    <>
                        <Label> Resume </Label>
                        <div className='h-20 mt-1 relative'>
                            <object data={resume?.profileResume} type='application/pdf' width="100%" height="100%">
                                <p><a href={resume?.profileResume}>To the PDF</a></p>
                            </object>
                            <X size={14} className='absolute -top-1 
                        -right-1 z-10 cursor-pointer'
                                onClick={() => { setResume({ profileBio: "", profilePhoto: "" }) }}
                            />
                        </div>
                    </>
                ) : (
                    <FormInput
                        label="Upload Resume"
                        type="file"
                        name="resume"
                        onChange={(event) => handleUpload(event, "resume")}
                    />
                )}

                <SelectFrom
                    name="role"
                    placeholder="Select user role"
                    list={["student", "recruiter"]}
                    value={formData.role} 
                    onChange={handleInputChange} 
                />

                <Button
                    type="submit"
                    className="w-full my-4 bg-yellow-400/90 hover:bg-yellow-400/100 font-semibold">
                    Sign Up
                </Button>
                <span>Already have an account? <Link href="/login" className='text-yellow-400 font-bold'>Login</Link></span>
            </form>
        </div>
    )
}
