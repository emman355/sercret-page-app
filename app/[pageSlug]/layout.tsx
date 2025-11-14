import DeleteAccount from '@/components/account-deletion';
import Navbar from '@/components/navigation/Navbar';
import WrapperContainer from '@/components/wrapper/wrapper-container';
import { FriendRequestProvider } from '@/context/FriendRequestContext';
import { SecretMessageProvider } from '@/context/SecretMessageContext';
import React from 'react'

export default function SecretPagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SecretMessageProvider>
            <FriendRequestProvider>
                <Navbar />
                <WrapperContainer>
                    <div className='flex flex-2 w-full'>
                        {children}
                    </div>
                    <div className='flex flex-1'>
                        <DeleteAccount />
                    </div>
                </WrapperContainer>
            </FriendRequestProvider>
        </SecretMessageProvider>

    );
}
