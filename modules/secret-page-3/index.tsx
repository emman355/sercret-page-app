import { FriendRequest } from './friend-request'
import Card from '@/components/card'
import FemaleIcon from '@/assets/gender-female.svg'
import MaleIcon from '@/assets/gender-male.svg'
import AddFriend from './add-friend'
import Typography from '@/components/typography'

const FRIEND_REQUEST_MOCK_DATA = [
	{
		userName: 'Bella',
		userImg: FemaleIcon,
	},
	{
		userName: 'Charlie',
		userImg: MaleIcon,
	},
]

export default function SecretPage3() {
	return (
		<>
			<Card className='flex flex-col gap-2'>
				<Typography variant='subtitle'>Friend Request</Typography>
				<div className='flex flex-col gap-4'>
					{
						FRIEND_REQUEST_MOCK_DATA.map(({ userName, userImg }, i) => {
							return (
								<FriendRequest key={`friend-${i + 1}`} userName={userName} userIcon={userImg} />
							)
						})
					}
				</div>
			</Card>
			<AddFriend />
		</>
	)
}
