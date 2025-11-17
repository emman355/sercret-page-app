'use client'

import React, { useEffect, useState } from 'react'
import Card from '@/components/card'
import Typography from '@/components/typography'
import UserInitialRound from '@/components/user-initial-round'
import { getUsernameFromEmail } from '@/utils/helpers/formatHelpers'
import SkeletonUi from '@/components/skeleton'
import { Accordion, AccordionItem } from '@heroui/accordion'
import { GoChevronRight } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";


type FriendSecret = {
    secret_message_id: string
    receiver_id: string
    friend_email: string
    friend_secret: string
    created_at: string
}

type FriendProps = {
    friendId: string
    email: string | undefined
}

type ErrorObject = {
    status: string
    message: string
    statusCode?: number
}

export default function FriendsSecret({ email, friendId }: FriendProps) {
    const [secrets, setSecrets] = useState<FriendSecret[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ErrorObject | null>(null)

    const itemClasses = {
        indicator: "text-xl",
        content: 'p-5',
    }

    useEffect(() => {
        const fetchSecrets = async () => {
            try {
                const res = await fetch(`/api/friends/messages/${friendId}`, {
                    method: 'GET',
                })

                const result = await res.json()

                if (!res.ok) {
                    setError(result)
                    return
                }

                setSecrets(result.data || [])
                setError(null)
            } catch (err) {
                setError({
                    status: 'error',
                    message: `Failed to fetch friend secrets: ${err instanceof Error ? err.message : String(err)}`,
                    statusCode: 500,
                })
            } finally {
                setLoading(false)
            }
        }

        fetchSecrets()
    }, [friendId])

    if (loading) {
        return (
            <SkeletonUi />
        )
    }

    return (
        <>
            {error?.statusCode === 401 && (
                <Card className="bg-gray-900 border-0 w-full flex flex-col gap-4">
                    <Accordion
                        itemClasses={itemClasses}
                    >
                        <AccordionItem
                            key="error"
                            aria-label="Error"
                            indicator={({ isOpen }) => (isOpen ? <GoChevronDown size={20} /> : <GoChevronRight size={20} />)}
                            title={<Typography variant="subtitle">
                                {getUsernameFromEmail(email)}
                            </Typography>}
                            startContent={
                                <UserInitialRound userName={email} />
                            }
                        >
                            <Typography variant="body" className="text-red-500">
                                Status: {error.status}
                                <br />
                                Message: {error.message}
                            </Typography>
                        </AccordionItem>
                    </Accordion>
                </Card>
            )}
            {!error &&
                secrets.map(secret => (
                    <Card key={secret.secret_message_id} className="bg-gray-900 border-0 w-full flex flex-col gap-4">
                        <Accordion
                            itemClasses={itemClasses}
                        >
                            <AccordionItem
                                key={secret.secret_message_id}
                                indicator={({ isOpen }) => (isOpen ? <GoChevronDown size={20} /> : <GoChevronRight size={20} />)}
                                aria-label={secret.secret_message_id}
                                title={<Typography variant="subtitle">
                                    {getUsernameFromEmail(email)}
                                </Typography>}
                                startContent={
                                    <UserInitialRound userName={email} />
                                }
                            >
                                <Typography variant="body">{secret.friend_secret}</Typography>
                                <Typography variant="small" className="text-gray-400">
                                    {new Date(secret.created_at).toLocaleString()}
                                </Typography>
                            </AccordionItem>
                        </Accordion>
                    </Card>
                ))
            }
        </>
    )
}
