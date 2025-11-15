"use client"

import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { getUsernameFromEmail } from "@/utils/helpers/formatHelpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiAwssecretsmanager } from "react-icons/si";
import { usePathname } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";

const navLinks = [
	{ href: '/secret-page-1', label: 'Secret Page 1' },
	{ href: '/secret-page-2', label: 'Secret Page 2' },
	{ href: '/secret-page-3', label: 'Secret Page 3' },
];

const Navbar = () => {
	const [message, setMessage] = useState("Navbar ready!");
	const [open, setOpen] = useState(false); // dropdown state
	const { user } = useSupabaseUser();
	const email = user?.email;
	const pathname = usePathname();

	useEffect(() => {
		if (message !== "Navbar ready!") {
			const timer = setTimeout(() => setMessage("Authentication actions simulated below."), 1);
			return () => clearTimeout(timer);
		}
	}, [message]);

	return (
		<nav className="bg-gray-800 text-white shadow-md shadow-gray-950 top-0 z-10 font-sans sticky w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo + Desktop Nav */}
					<div className="flex items-center space-x-8">
						<div className="flex items-center space-x-4">
							{/* Logo */}
							<Link href="/" className="w-full self-end flex items-center gap-2">
								<SiAwssecretsmanager size={15} />
								<h1 className="text-2xl font-bold text-indigo-400">Secret Page App</h1>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden sm:ml-6 sm:flex sm:space-x-4">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={`px-3 py-2 text-sm font-medium transition duration-150 ${pathname === link.href ? "text-indigo-400" : "text-gray-300 hover:text-white"
										}`}
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>

					{/* User Info */}
					<div className="flex items-center space-x-4">
						{user && email ? (
							<span className="text-sm font-semibold text-indigo-200 sm:block truncate max-w-[120px]">
								{getUsernameFromEmail(email)}
							</span>
						) : (
							<div className="text-sm text-gray-400">Loading user...</div>
						)}
						{/* 📱 Mobile Toggle Button - Right Aligned */}
						<button
							onClick={() => setOpen(!open)}
							className="sm:hidden flex items-center bg-none px-2 py-1 rounded-md text-sm font-medium text-gray-100"
						>
							<BsThreeDotsVertical size={18} />
						</button>
					</div>
				</div>

				{/* 📱 Breadcrumb Dropdown (mobile only) */}
				<div className="sm:hidden mt-2 relative">
					{/* 📱 Mobile Dropdown Navigation */}
					{open && (
						<div className="absolute w-full mt-2 bg-linear-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl ring-1 ring-white/10 z-20 animate-fade-in">
							<ul className="flex flex-col divide-y divide-gray-700">
								{navLinks.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className={`block px-5 py-3 text-base font-semibold tracking-wide transition-colors duration-200 rounded-md ${pathname === link.href
												? "bg-gray-600 text-white shadow-inner"
												: "text-gray-200 hover:bg-gray-700 hover:text-white"
												}`}
											onClick={() => setOpen(false)}
											aria-current={pathname === link.href ? "page" : undefined}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}

				</div>
			</div>
		</nav>
	);
};

export default Navbar;
