'use client'

import Button from '@/components/button'
import Card from '@/components/card'
import Typography from '@/components/typography'
import { useFriendRequest } from '@/context/FriendRequestContext'

export default function AddFriend() {
  const { input, sendStatus, errorMessage, handleInputChange, handleSubmit } = useFriendRequest()

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex gap-10">
        <div className="w-full gap-2 flex flex-col">
          <label htmlFor="new-friend-username">
            <Typography variant="subtitle">Add Friend</Typography>
          </label>
          <input
            id="new-friend-username"
            value={input}
            onChange={handleInputChange}
            className="w-full p-2 border text-gray-200 border-gray-700 rounded-lg placeholder-gray-400"
            placeholder="Please enter email or username"
            disabled={sendStatus === 'loading'}
          />
        </div>

        <Button
          type="submit"
          className="bg-cyan-700 hover:bg-cyan-600 self-end w-xs"
          ariaLabel="Add friend request button"
          buttonText={sendStatus === 'loading' ? 'Sending...' : 'Send Request'}
          textStyle="text-white"
          disabled={sendStatus === 'loading'}
        />

        <div className="text-sm font-semibold mt-2">
          {sendStatus === 'added' && (
            <span className="text-green-800 flex items-center animate-pulse-once">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Request Sent!
            </span>
          )}
          {sendStatus === 'error' && <span className="text-red-600">{errorMessage}</span>}
          {sendStatus === 'idle' && <span className="text-gray-500">Ready</span>}
        </div>
      </form>
    </Card>
  )
}
