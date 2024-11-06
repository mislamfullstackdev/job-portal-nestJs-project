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

export const SelectFrom = ({name, placeholder, list}) => {
  return (
    <Select name={name}>
    <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
        <SelectGroup>
            <SelectLabel>Select a Role</SelectLabel>
            {list?.map((item, index)=>(
                <SelectItem key={index}
                value={name==="role" ? item: item?.id}>
                    {name==="role" ? item: item?.name}
                </SelectItem>
                )
            )}
        </SelectGroup>
    </SelectContent>
    </Select>

  )
}
