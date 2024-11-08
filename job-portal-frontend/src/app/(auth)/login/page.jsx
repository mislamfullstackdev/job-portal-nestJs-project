"use client";
import { login } from '@/actions/user';
import FormInput from '@/components/FormInput'
import { SelectFrom } from '@/components/SelectFrom';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
    const [user, setUser] = useLocalStorage({
        key: 'userData',
        defaultValue: {},
    });
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const response = await login(formData);
        if (response?.error) {
            toast.error(response?.error);
        }
        else {
            console.log("response?.result", response)
            setUser(response)
            router.push("/");
        }
    }

    useEffect(() => {
        if (user?.role == "recruiter") {
            router?.push("/admin/companies");
        } else if (user?.role == "student") {
            router?.push("/login");
        }
    }, []);

    return (
        <div className='flex items-center justify-center h-[calc(100vh_-_115px)] max-w-7xl mx-auto mb-12'>
            <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded p-4 bg-gray-100 my-6'>
                <h2 className='font-bold text-2xl mb-4 text-yellow-400 text-center'>
                    Login
                </h2>
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your Email Address"
                   />
                <FormInput
                    label="Password"
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                />
                <SelectFrom
                    name="role"
                    placeholder="Select User Role"
                    list={["student", "recruiter"]}
                    value={formData.role} 
                    onChange={handleInputChange} 
                />
                <Button
                    type="submit"
                    className="w-full my-4 bg-yellow-400/90 hover:bg-yellow-400/100 font-semibold">
                    Login
                </Button>
                <span>You don't have an account? <Link href="/register" className='text-yellow-400 font-bold'>Sign Up</Link></span>
            </form>
        </div>
    )
}
