"use client"

import Card from "@/components/card";
import Typography from "@/components/typography";
import Button from "../button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface CardDetailsProps {
    className?: string,
}

const CardDetails = {
    cardTitle: "Account Settings",
    cardDescription: "Manage your ccount settings and data"
}
export default function DeleteAccount({ className }: CardDetailsProps) {
    const baseClasses = 'flex flex-col justify-between shadow-md shadow-gray-950 max-h-max w-full space-y-6';
    const finalClasses = `${baseClasses} ${className}`;

    const router = useRouter();
    const supabase = createClient();

    const handleDeleteAccount = async () => {
        const confirmed = confirm('Are you sure you want to delete your account? This action is irreversible.');
        if (!confirmed) return;

        try {
            const response = await fetch('/api/users', {
                method: 'DELETE',
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to delete account.');
            }

            alert('Account deleted successfully.');
            // Sign out to clear session
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Sign out error after deletion:', error.message);
            }
            await new Promise(resolve => setTimeout(resolve, 500));
            router.push('/');
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            alert(`Error: ${errorMessage}`);
        }
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout error:', error.message);
        } else {
            alert('User logged out successfully');
            await new Promise(resolve => setTimeout(resolve, 500));
            router.push('/');
        }
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
