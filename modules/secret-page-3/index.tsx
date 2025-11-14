'use client'

import { FriendRequest } from './friend-request'
import Card from '@/components/card'
import Typography from '@/components/typography'
import AddFriend from './add-friend'
import MaleIcon from '@/public/assets/gender-male.svg'
import { useFriendRequest } from '@/context/FriendRequestContext'
import SkeletonUi from '@/components/skeleton'
import FriendsSecret from './friends-secret'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

type AdminUser = {
	id: string
	email?: string | null
}

const supabaseUser = createClient()
const supabaseAdmin = createAdminClient()

export default function SecretPage3() {
	const { friendRequests, loadingRequests } = useFriendRequest()
	const [allUsers, setAllUsers] = useState<AdminUser[]>([])
	const [loadingUsers, setLoadingUsers] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let isMounted = true

		const fetchUsers = async () => {
			try {
				setLoadingUsers(true)

				const {
					data: { user },
					error: userError,
				} = await supabaseUser.auth.getUser()
				if (userError) throw userError

				const { data: usersData, error: adminError } =
					await supabaseAdmin.auth.admin.listUsers()
				if (adminError) throw adminError

				const usersList = usersData?.users ?? []
				const others = usersList.filter((u: AdminUser) => u.id !== user?.id)

				if (isMounted) setAllUsers(others)
			} catch (err: unknown) {
				if (isMounted) {
					if (err instanceof Error) {
						setError(err.message ?? 'Failed to fetch users')
					} else {
						setError(String(err) || 'Failed to fetch users')
					}
				}
			} finally {
				if (isMounted) setLoadingUsers(false)
			}
		}

		fetchUsers()
		return () => {
			isMounted = false
		}
	}, [])

	console.log(allUsers, "allUsers")

	return (
		<>
			{!loadingRequests ? (<Card className="flex flex-col gap-2">
				<Typography variant="subtitle">Friend Request</Typography>
				<div className="flex flex-col gap-4">
					{friendRequests.length === 0 ? (
						<p>No incoming requests.</p>
					) : (
						friendRequests.map((req, i) => (
							<FriendRequest
								key={`friend-${i + 1}`}
								sender_email={req.sender_email} // fallback to sender_id if no name
								userIcon={MaleIcon} // replace with avatar/icon if you have it
								requestId={req.id}
							/>
						))
					)}
				</div>
			</Card>) : (
				<SkeletonUi />
			)}
			<AddFriend />
			<Card className="bg-gray-800 shadow-gray-950 shadow-md flex flex-col gap-4">
				<Typography variant="subtitle">Secret Messages</Typography>
				{allUsers?.map((user) => (
					user.email && (
						<FriendsSecret key={user.id} friendId={user.id} email={user.email} />
					)
				))}
			</Card>

		</>
	)
}
