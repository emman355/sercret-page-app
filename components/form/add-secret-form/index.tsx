"use client"

import Button from '@/components/button';
import Card from '@/components/card';
import Typography from '@/components/typography';
import { useSecretMessageContext } from '@/context/SecretMessageContext';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// ✅ Yup schema for validation
const schema = yup.object().shape({
	newMessage: yup
		.string()
		.trim()
		.required("Secret message is required")
		.min(5, "Message must be at least 5 characters"),
});

type FormValues = {
	newMessage: string;
};

export default function AddSecretForm() {
	const { addSecretMessage, setError } = useSecretMessageContext();
	const [isAdding, setIsAdding] = useState(false);
	const [addStatus, setAddStatus] = useState<'idle' | 'adding' | 'added' | 'error'>('idle');

	// ✅ useForm setup
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: FormValues) => {
		try {
			setIsAdding(true);
			setAddStatus('adding');
			await addSecretMessage(data.newMessage.trim());
			setIsAdding(false);
			setAddStatus('added');
			reset(); // clear form
			setTimeout(() => setAddStatus('idle'), 2000);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unknown error');
			setIsAdding(false);
			setAddStatus('error');
		}
	};

	return (
		<Card className="flex flex-col gap-2">
			<Typography variant="subtitle">
				Add a New Secret Message
			</Typography>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{/* Editable Textarea */}
				<div className='flex flex-col gap-2'>
					{/* Validation Error */}
					{errors.newMessage && (
						<p className="text-red-500 text-sm mt-1">
							{errors.newMessage.message}
						</p>
					)}
					<textarea
						id="new-secret-message"
						rows={4}
						{...register("newMessage")}
						className="w-full p-3 border text-gray-200 border-gray-700 rounded-lg placeholder-gray-400 resize-none focus:outline-none focus:ring-gray-500 focus:border-gray-500"
						placeholder="Write a new secret note..."
					/>
				</div>

				<div className="flex items-center justify-between">
					<Button
						type="submit"
						className="self-end w-3xs bg-green-800 hover:bg-green-700 disabled:bg-green-950 disabled:shadow-none"
						ariaLabel="Add secret message button"
						buttonText={isAdding ? "Adding Secret..." : "Add Secret Message"}
						textStyle="text-white"
						disabled={isAdding}
					/>

					{/* Status Indicator */}
					<div className="text-sm font-semibold">
						{addStatus === 'added' && (
							<span className="text-green-800 flex items-center animate-pulse-once">
								<svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
								Secret Added!
							</span>
						)}
						{addStatus === 'error' && <span className="text-red-600">Error Adding</span>}
						{addStatus === 'idle' && <span className="text-gray-500">Ready</span>}
					</div>
				</div>
			</form>
		</Card>
	);
}
