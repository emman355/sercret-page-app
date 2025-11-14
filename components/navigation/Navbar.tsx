"use client"

import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { getUsernameFromEmail } from "@/utils/helpers/formatHelpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiAwssecretsmanager } from "react-icons/si";

// Navigational links
const navLinks = [
	{ href: '/secret-page-1', label: 'Secret Page 1' },
	{ href: '/secret-page-2', label: 'Secret Page 2' },
	{ href: '/secret-page-3', label: 'Secret Page 3' },
];

/**
 * Navbar Component: Displays logo, navigation links, and user actions.
 */
const Navbar = () => {
	const [message, setMessage] = useState("Navbar ready!");
	const { user } = useSupabaseUser();
	const email = user?.email;

	useEffect(() => {
		// Reset message after a few seconds
		if (message !== "Navbar ready!") {
			const timer = setTimeout(() => setMessage("Authentication actions simulated below."), 1);
			return () => clearTimeout(timer);
		}
	}, [message]);

	return (
		<nav className="bg-gray-800 text-white shadow-md shadow-gray-950 top-0 z-10 font-sans sticky w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* 1. Logo and Navigation (Left) */}
					<div className="flex items-center space-x-8">
						{/* App Logo */}
						{/* Using <a> tag as a placeholder for Next.js <Link href="/"> */}
						<Link href="/" className="flex items-center gap-2">
							<SiAwssecretsmanager size={15} />
							<h1 className="text-2xl font-bold text-indigo-400">Secret Page App</h1>
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
						{user && email ? (
							<>
								{/* UserName Display */}
								<span className="text-sm font-semibold text-indigo-200 hidden sm:block truncate max-w-[120px]">
									{getUsernameFromEmail(email)}
								</span>
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