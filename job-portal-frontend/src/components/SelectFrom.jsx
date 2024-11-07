import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  

  export const SelectFrom = ({ name, placeholder, list, value, onChange }) => {
    const handleChange = (newValue) => {
        onChange({ target: { name, value: newValue } }); // Custom way to trigger onChange
    };

    return (
        <Select name={name} value={value} onValueChange={handleChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Select a Role</SelectLabel>
                    {list?.map((item, index) => (
                        <SelectItem key={index} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
  