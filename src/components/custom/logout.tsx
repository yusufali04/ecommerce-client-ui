'use client'

import React from 'react'
import { Button } from '../ui/button'
import { logout } from '@/lib/actions/logout'

const LogoutButton = () => {
    return (
        <Button onClick={async () => await logout()} size={"sm"}>Logout</Button>
    )
}

export default LogoutButton;