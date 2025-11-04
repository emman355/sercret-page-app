"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiAwssecretsmanager } from "react-icons/si";

// Navigational links
const navLinks = [
	{ href: '/secret-page-1', label: 'Secret Page 1' },
	{ href: '/secret-page-2', label: 'Secret Page 2' },
	{ href: '/secret-page-3', label: 'Secret Page 3' },
];

// Trash Icon for Delete Account Button
const TrashIcon = () => (
	<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.14-2.043-2.219a3.75 3.75 0 00-.77 0c-.868.009-1.57.59-1.898 1.48L8.27 4.97c-.328-.89-.356-1.543-1.898-1.543a3.75 3.75 0 00-.77 0c-1.133.079-2.043 1.039-2.043 2.221v.916m0 0h16.5" />
	</svg>
);
/**
 * Navbar Component: Displays logo, navigation links, and user actions.
 */
const Navbar = () => {
	// 1. Placeholder State for the authenticated user
	const [username, setUsername] = useState<string | null>("Emmanuel A. Arevalo");
	const [message, setMessage] = useState("Navbar ready!");

	// 2. Placeholder Handler Functions
	const handleLogout = () => {
		setUsername(null);
		setMessage("Logged out successfully.");
	};

	const handleDeleteAccount = () => {
		setUsername(null);
		setMessage("Account deleted. You are now logged out.");
		// In a real app, this would trigger an API call to delete the user record.
	};

	useEffect(() => {
		// Reset message after a few seconds
		if (message !== "Navbar ready!") {
			const timer = setTimeout(() => setMessage("Authentication actions simulated below."), 3000);
			return () => clearTimeout(timer);
		}
	}, [message]);

	return (
		<nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-10 font-sans">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* 1. Logo and Navigation (Left) */}
					<div className="flex items-center space-x-8">
						{/* App Logo */}
						{/* Using <a> tag as a placeholder for Next.js <Link href="/"> */}
						<Link href="/secret-page-1" className="flex items-center gap-2">
							<SiAwssecretsmanager size={15} />
							<h1 className="text-2xl font-bold text-indigo-400">Secret App</h1>
						</Link>

						{/* Navigation Links (Hidden on small screens) */}
						<div className="hidden sm:ml-6 sm:flex sm:space-x-4">
							{navLinks.map((link) => (
								// Using <a> tag as a placeholder for Next.js <Link>
								<Link
									key={link.href}
									href={link.href}
									className="px-3 py-2 text-sm font-medium text-gray-300  hover:text-white transition duration-150"
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>

					{/* 2. User Info and Actions (Right) */}
					<div className="flex items-center space-x-4">
						{username ? (
							<>
								{/* Username Display */}
								<span className="text-sm font-semibold text-indigo-200 hidden sm:block truncate max-w-[120px]">
									{username}
								</span>

								{/* Logout Button */}
								<button
									onClick={handleLogout}
									className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-150 shadow-md transform hover:scale-[1.02] active:scale-95"
									aria-label="Logout"
								>
									Logout
								</button>

								{/* Delete Account Button */}
								<button
									onClick={handleDeleteAccount}
									className="p-1.5 text-red-400 border border-red-400 rounded-full hover:bg-red-900 transition duration-150 transform hover:rotate-3 active:rotate-0"
									aria-label="Delete Account"
								>
									<TrashIcon />
								</button>
							</>
						) : (
							// Loading/Unauthenticated state
							<div className="text-sm text-gray-400">Loading user...</div>
						)}
					</div>

				</div>
			</div>
		</nav>
	);
};

export default Navbar