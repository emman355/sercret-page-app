'use client';

import Card from '@/components/card';
import EditSecretForm from '@/components/form/edit-secret-form';
import Typography from '@/components/typography';
import SkeletonUi from '@/components/skeleton';
import { useSecretMessageContext } from '@/context/SecretMessageContext';
import { VALID_PAGES } from '@/constants/variables';

interface SecretPage1Props {
	params: string
}

export default function SecretPage1({ params }: SecretPage1Props) {
	const {
		loading,
		error,
		newSecretMessage,
		messages,
		messageId,
		handleEditClick,
		setNewSecretMessage,
		handleSaveSecret,
		handleCancelEdit,
		isSaving,
		saveStatus } = useSecretMessageContext();

	if (loading) return <SkeletonUi />;
	if (error) return <Typography variant="subtitle" className="text-red-600">Error: {error}</Typography>;

	console.log(params, "params")
	return (
		<Card
			className="bg-gray-800 shadow-gray-950 shadow-md flex flex-col gap-4"
		>
			<Typography variant="subtitle">Your Secret Message</Typography>
			{messages.length !== 0 ?
				messages?.map((msg) => (
					<Card className="gap-4 bg-gray-900 border-0 w-full" key={msg.id} onClick={() => handleEditClick(msg.id)}>
						{messageId === msg.id && !VALID_PAGES[0].includes(params) ? (
							<EditSecretForm
								placeholder={msg.content}
								inputMessage={newSecretMessage}
								setInputMessage={setNewSecretMessage}
								handleSaveSecret={handleSaveSecret}
								handleCancelEdit={handleCancelEdit}
								isSaving={isSaving}
								saveStatus={saveStatus}
							/>
						) : (
							<Typography variant="body">{msg.content}</Typography>
						)}
					</Card>
				)) :
				<Card className="gap-4 bg-gray-900 border-0 w-full">
					<Typography variant="body">You have no secret messages.</Typography>
				</Card>
			}
		</Card>
	);
}
