'use client';
import { getUsernameFromEmail } from '@/utils/helpers/formatHelpers';
import Button from '@/components/button';
import Card from '@/components/card';
import Typography from '@/components/typography';
import { useFriendRequest } from '@/context/FriendRequestContext';
import React from 'react';

interface FriendRequestProps {
  sender_email: string;
  userIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  requestId: string;
}

export function FriendRequest({ sender_email, userIcon, requestId }: FriendRequestProps) {
  const RenderedIcon = userIcon;

  const { handleAcceptRequest, acceptStatus, handleDeclineRequest, declineStatus } = useFriendRequest()



  return (
    <Card className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-xl shadow-lg">
      {/* Left side: Icon + Username */}
      <div className="flex gap-4 items-center">
        <RenderedIcon className="w-12 h-12 text-cyan-400 bg-gray-950 p-2 rounded-full" />
        <Typography variant="body" className="font-medium text-lg">
          {getUsernameFromEmail(sender_email)}
        </Typography>
      </div>
      
      <div className="flex gap-3">
        <Button
          onClick={() => handleAcceptRequest(requestId)}
          disabled={acceptStatus === 'sending' || acceptStatus === 'sent'}
          className="bg-cyan-700 hover:bg-cyan-600 disabled:bg-gray-700"
          aria-label={`Accept friend request from ${sender_email}`}
          buttonText={
            acceptStatus === 'sent'
              ? 'Accepted'
              : acceptStatus === 'sending'
                ? 'Processing...'
                : 'Accept'
          }
          textStyle="text-white"
        />
        <Button
          onClick={() => handleDeclineRequest(requestId)}
          disabled={declineStatus === 'sending' || declineStatus === 'sent'}
          className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400"
          textStyle="text-gray-700"
          aria-label={`Decline friend request from ${sender_email}`}
          buttonText="Decline"
        />
      </div>
    </Card>
  );
}
