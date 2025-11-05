"use client"

export default function HomePage() {
	const handleDeleteAccount = () => {
		alert("Account deleted. You are now logged out.");
		// In a real app, this would trigger an API call to delete the user record.
	};
	return (
		<div className="flex min-h-screen justify-center">
			<div className="content-center">
				<div className="p-6 border border-white rounded-lg flex gap-16">
					<div>
						<h1 className="text-2xl">Account Settings</h1>
						<p className="font-normal text-md">Manage your ccount settings and data</p>
					</div>

					{/* Delete Account Button */}
					<button
						onClick={handleDeleteAccount}
						className="p-2 text-red-400 font-bold border border-red-400 rounded-lg hover:bg-red-900"
						aria-label="Delete Account"
					>
						Delete my account
					</button>
				</div>
			</div>
		</div>
	)
}
