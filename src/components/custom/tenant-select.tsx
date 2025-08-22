'use client';
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tenant } from '@/lib/types';
import { useRouter } from 'next/navigation';

const TenantSelect = ({ restaurants }: { restaurants: { data: Tenant[] } }) => {
    const router = useRouter();
    const handleValueChange = (value: string) => {
        router.push(`/?restaurant=${value}`)
    }
    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px] focus:ring-0">
                <SelectValue placeholder="Select restaurant" />
            </SelectTrigger>
            <SelectContent>
                {
                    restaurants.data.map((restaurant: Tenant) => {
                        return <SelectItem key={restaurant.id} value={restaurant.id}>{restaurant.name}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    )
}

export default TenantSelect;