"use client"

import Card from '@/components/card'
import EditSecretForm from '@/components/form/edit-secret-form';
import Typography from '@/components/typography'
import { USER_NAME } from '@/constants/constants'
import { useCallback, useState } from 'react';

const CardDetails = {
	secretMessage: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, nisi! Aspernatur illum ipsa tenetur earum sint culpa, similique aliquam harum accusamus asperiores quis recusandae magni. Eveniet dolor minus consequuntur odio?`
}

export default function SecretPage1() {
	const [isEditing, setIsEditing] = useState(false);
	const [inputMessage, setInputMessage] = useState("");
	const [isSaving] = useState(false);
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	// Function to enter edit mode
	const handleEditClick = () => {
		setIsEditing(true);
		setSaveStatus('idle');

		// Ensure the inputMessage is synced with the latest saved message when starting edit
		setInputMessage(CardDetails.secretMessage);
	};

	const handleSaveSecret = useCallback(async (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setSaveStatus('saving');
		setIsEditing(false);
	}, []);

	const handleCancelEdit = (e: React.FormEvent) => {
		e.stopPropagation();
		setIsEditing(false);
		setInputMessage(inputMessage); // Revert changes in the input field
	};

	if (isEditing) {
		return (
			<Card className={`bg-gray-800 shadow-gray-950 shadow-md flex`}>
				<EditSecretForm inputMessage={inputMessage}
					setInputMessage={setInputMessage}
					handleSaveSecret={handleSaveSecret}
					handleCancelEdit={handleCancelEdit}
					isSaving={isSaving}
					saveStatus={saveStatus} />
			</Card>

		)
	}

	return (
		<Card className={`bg-gray-800 shadow-gray-950 shadow-md flex flex-col gap-2`} onClick={handleEditClick}>
			<Typography variant="subtitle">Secret Message</Typography>
			<Card className="gap-4 bg-gray-900 border-0 w-full">
				<Typography variant="subtitle">{USER_NAME}</Typography>
				<Typography variant="body">
					{CardDetails.secretMessage}
				</Typography>
			</Card>
		</Card>
	)
}
