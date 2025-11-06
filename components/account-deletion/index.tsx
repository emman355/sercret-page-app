"use client"

import Card from "@/components/card";
import Typography from "@/components/typography";
import Button from "../button";

interface CardDetailsProps {
    className?: string,
}

const CardDetails = {
    cardTitle: "Account Settings",
    cardDescription: "Manage your ccount settings and data"
}
export default function DeleteAccount({className}: CardDetailsProps) {
    const baseClasses = 'flex flex-col justify-between shadow-md shadow-gray-950 max-h-max w-full space-y-6';
    const finalClasses = `${baseClasses} ${className}`;

    const handleDeleteAccount = () => {
        alert("Account deleted. You are now logged out.");
        // In a real app, this would trigger an API call to delete the user record.
    };

    const handleLogout = () => {
        alert("Logged out successfully.");
    };


    return (
        <Card className={finalClasses}>
            <div className="flex flex-col gap-2">
                <Typography variant="subtitle">{CardDetails.cardTitle}</Typography>
                <Typography variant="body">{CardDetails.cardDescription}</Typography>
            </div>

            {/* Delete Account Button */}
            <div className="flex flex-col gap-4">
                {/* Logout Button */}
                <Button
                    onClick={handleLogout}
                    className='bg-red-600 rounded-lg hover:bg-red-700'
                    ariaLabel="Logout"
                    buttonText='Logout'
                    textStyle='text-white font-medium'
                />
                {/* Delete account Button */}
                <Button
                    onClick={handleDeleteAccount}
                    className='border border-red-400 rounded-lg hover:bg-red-900'
                    ariaLabel="Delete my account"
                    buttonText='Delete my account'
                    textStyle='text-white font-medium'
                />
            </div>
        </Card>
    )
}
