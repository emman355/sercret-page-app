import Button from '@/components/button';
import Card from '@/components/card'
import Typography from '@/components/typography'
import React from 'react' // Import React for the ComponentType definition

interface FriendRequestProps {
	userName: string,
	// Specifying the prop type as a React functional/class component
	userIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// Changed to a named export (removed 'default')
export function FriendRequest({ userName, userIcon }: FriendRequestProps) {
	// You can render components passed as props by capitalizing the prop name.
	const RenderedIcon = userIcon

	return (
		<Card className='flex justify-between items-center bg-gray-900 text-white p-4 rounded-xl shadow-lg'>
			<div className='flex gap-4 items-center'>
				{/* Render the icon component */}
				<RenderedIcon className='w-12 h-12 text-cyan-400 bg-gray-950 p-2 rounded-full' />
				<Typography variant='body' className='font-medium text-lg'>{userName}</Typography>
			</div>
			<div className='flex gap-3'>
				<Button
					className='bg-cyan-700 hover:bg-cyan-600'
					aria-label={`Accept friend request from ${userName}`}
					buttonText="Accept"
					textStyle='text-white'
				/>
				<Button
					className='bg-gray-200 hover:bg-gray-300'
					textStyle='text-gray-700'
					aria-label={`Decline friend request from ${userName}`}
					buttonText="Decline"
				/>
			</div>
		</Card>
	)
}