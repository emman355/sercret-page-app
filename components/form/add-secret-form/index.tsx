"use client"

import Button from '@/components/button';
import Card from '@/components/card';
import Typography from '@/components/typography';
import { useSecretMessageContext } from '@/context/SecretMessageContext';
import React, { useState } from 'react'

export default function AddSecretForm() {
	const [newMessage, setNewMessage] = useState('');
	const [isAdding, setIsAdding] = useState(false);
	const [addStatus, setAddStatus] = useState<'idle' | 'adding' | 'added' | 'error'>('idle');
	const { addSecretMessage } = useSecretMessageContext()

	const handleAddSecret = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newMessage.trim()) return;

		setIsAdding(true);
		setAddStatus('adding');
		await addSecretMessage(newMessage.trim());
		setIsAdding(false);
		setAddStatus('added');
		setNewMessage('');
		setTimeout(() => setAddStatus('idle'), 2000);
	};
	return (
		<Card className='flex flex-col gap-2'>
			<Typography variant='subtitle'>
				Add a New Secret Message
			</Typography>
			<form onSubmit={handleAddSecret} className="space-y-4">

				{/* Editable Textarea */}
				<div>
					<textarea
						id="new-secret-message"
						rows={4}
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						className="w-full p-3 border text-gray-200 border-gray-700 rounded-lg placeholder-gray-400 resize-none"
						placeholder="Write a new secret note..."
					/>
				</div>

				<div className="flex items-center justify-between">

					<Button
						type="submit"
						className='self-end w-3xs bg-green-800 hover:bg-green-700 disabled:bg-green-950 disabled:shadow-none'
						ariaLabel={`Add friend request button`}
						buttonText={isAdding ? 'Adding Secret...' : 'Add Secret Message'}
						textStyle='text-white'
						disabled={isAdding || !newMessage.trim()}
					/>
					{/* Status Indicator */}
					<div className="text-sm font-semibold">
						{addStatus === 'added' && (
							<span className="text-green-800 flex items-center animate-pulse-once">
								<svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
								Secret Added!
							</span>
						)}
						{addStatus === 'error' && <span className="text-red-600">Error Adding</span>}
						{addStatus === 'idle' && <span className="text-gray-500">Ready</span>}
					</div>

				</div>
			</form>
		</Card>
	)
}
