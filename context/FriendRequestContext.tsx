'use client';
import { createAdminClient } from '@/utils/supabase/admin'
import React, { createContext, useContext, useEffect, useState } from 'react'

type SendStatus = 'idle' | 'loading' | 'added' | 'error'
type ActionStatus = 'idle' | 'sending' | 'sent' | 'error' | 'declined'

interface FriendRequestType {
	id: string
	sender_email: string
	// add other fields returned by your API
}

interface FriendRequestContextProps {
	input: string
	sendStatus: SendStatus
	errorMessage: string
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleSubmit: (inputValue: string) => Promise<void>

	// accepting friend request
	acceptStatus: ActionStatus
	handleAcceptRequest: (requestId: string) => Promise<void>

	// declining friend request
	declineStatus: ActionStatus
	handleDeclineRequest: (requestId: string) => Promise<void>

	// incoming requests
	friendRequests: FriendRequestType[]
	loadingRequests: boolean
	refreshRequests: () => Promise<void>
}

const FriendRequestContext = createContext<FriendRequestContextProps | undefined>(undefined)

export const FriendRequestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [input, setInput] = useState('')
	const [sendStatus, setSendStatus] = useState<SendStatus>('idle')
	const [acceptStatus, setAcceptStatus] = useState<ActionStatus>('idle')
	const [declineStatus, setDeclineStatus] = useState<ActionStatus>('idle')
	const [errorMessage, setErrorMessage] = useState('')
	const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([])
	const [loadingRequests, setLoadingRequests] = useState(true)
	const supabase = createAdminClient()

	// --- Fetch incoming requests ---
	const refreshRequests = async () => {
		setLoadingRequests(true)
		try {
			const res = await fetch('/api/friends/incoming-request', { method: 'GET' })
			const data = await res.json()
			if (data.success) {
				setFriendRequests(data.data)
			}
		} catch (err) {
			setErrorMessage(`Error fetching friend requests: ${err instanceof Error ? err.message : String(err)}`)
		} finally {
			setLoadingRequests(false)
		}
	}

	useEffect(() => {
		refreshRequests()
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value)
		setSendStatus('idle')
		setErrorMessage('')
	}

	const handleSubmit = async (inputValue: string): Promise<void> => {
		if (!inputValue.trim()) {
			setSendStatus('error')
			setErrorMessage('Please enter a valid email or username.')
			return
		}

		setSendStatus('loading')

		try {
			const { data, error } = await supabase.from('users').select('id').eq('email', inputValue)

			if (error || !data || data.length === 0) {
				setSendStatus('error')
				setErrorMessage('User not found.')
				return
			}

			const receiver_id = data[0].id

			const response = await fetch('/api/friends', {
				method: 'POST',
				body: JSON.stringify({ receiver_id }),
			})

			const result = await response.json()

			if (response.ok && result.success) {
				setSendStatus('added')
			} else {
				setSendStatus('error')
				setErrorMessage(result.message || 'Failed to send friend request.')
			}
		} catch (err) {
			setErrorMessage(`Friend request error:  ${err instanceof Error ? err.message : String(err)}`)
			setSendStatus('error')
		}
	}

	// --- Accepting friend request ---
	const handleAcceptRequest = async (requestId: string) => {
		setAcceptStatus('sending');
		try {
			const res = await fetch('/api/friends/accept-friend', {
				method: 'POST',
				body: JSON.stringify({ requestId }),
			});

			const data = await res.json();

			if (res.ok && data.success) {
				setAcceptStatus('sent');
				await refreshRequests(); // ✅ refresh after accept
			} else {
				setAcceptStatus('error');
			}
		} catch (err) {
			setAcceptStatus('error');
			setErrorMessage(`Error accepting request:  ${err instanceof Error ? err.message : String(err)}`);
		}
	};

	// --- Declining friend request ---
	const handleDeclineRequest = async (requestId: string) => {
		setDeclineStatus('sending');
		try {
			const res = await fetch(`/api/friends/decline-friend/${requestId}`, {
				method: 'DELETE',
			});

			const data = await res.json();

			if (res.ok && data.success) {
				setDeclineStatus('declined');
				await refreshRequests(); // ✅ refresh after decline
			} else {
				setDeclineStatus('error');
			}
		} catch (err) {
			setDeclineStatus('error');
			setErrorMessage(`Error declining request: ${err instanceof Error ? err.message : String(err)}`,);
		}
	};

	return (
		<FriendRequestContext.Provider
			value={{
				input,
				sendStatus,
				errorMessage,
				handleInputChange,
				handleSubmit,
				acceptStatus,
				handleAcceptRequest,
				declineStatus,
				handleDeclineRequest,
				friendRequests,
				loadingRequests,
				refreshRequests,
			}}
		>
			{children}
		</FriendRequestContext.Provider>
	)
}

export const useFriendRequest = () => {
	const ctx = useContext(FriendRequestContext)
	if (!ctx) throw new Error('useFriendRequest must be used within FriendRequestProvider')
	return ctx
}
