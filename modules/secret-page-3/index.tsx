'use client'

import { FriendRequest } from './friend-request'
import Card from '@/components/card'
import Typography from '@/components/typography'
import AddFriend from './add-friend'
import MaleIcon from '@/assets/gender-male.svg'
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

  return (
    <>
      {/* Friend Requests */}
      {!loadingRequests ? (
        <Card className="flex flex-col gap-2">
          <Typography variant="subtitle">Friend Request</Typography>
          <div className="flex flex-col gap-4">
            {friendRequests.length === 0 ? (
              <p>No incoming requests.</p>
            ) : (
              friendRequests.map((req, i) => (
                <FriendRequest
                  key={`friend-${i + 1}`}
                  sender_email={req.sender_email}
                  userIcon={MaleIcon}
                  requestId={req.id}
                />
              ))
            )}
          </div>
        </Card>
      ) : (
        <SkeletonUi />
      )}

      <AddFriend />

      {/* Secret Messages */}
      <Card className="bg-gray-800 shadow-gray-950 shadow-md flex flex-col gap-4">
        <Typography variant="subtitle">Secret Messages</Typography>

        {loadingUsers && <SkeletonUi />} {/* ✅ show skeleton while loading */}

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )} {/* ✅ show error if any */}

        {!loadingUsers && !error && allUsers.length === 0 && (
          <p className="text-gray-400">No other users found.</p>
        )}

        {!loadingUsers && !error && allUsers.map(
          (user) =>
            user.email && (
              <FriendsSecret key={user.id} friendId={user.id} email={user.email} />
            )
        )}
      </Card>
    </>
  )
}
