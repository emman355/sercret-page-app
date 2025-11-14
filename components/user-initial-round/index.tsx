import { getUsernameInitialFromEmail } from '@/utils/helpers/formatHelpers'
import React from 'react'
import Typography from '../typography'

interface UserInitialRoundProps {
    userName?: string
}

export default function UserInitialRound({ userName }: UserInitialRoundProps) {
    const initial = getUsernameInitialFromEmail(userName)

    return (
        <Typography
            variant="subtitle"
            color="text-cyan-700"
            className="flex items-center justify-center rounded-full bg-gray-950 w-15 h-15 text-md font-bold">
            {initial}
        </Typography>
    )
}
