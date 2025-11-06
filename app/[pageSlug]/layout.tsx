import DeleteAccount from '@/components/account-deletion';
import WrapperContainer from '@/components/wrapper/wrapper-container';
import React from 'react'

export default function SecretPagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <WrapperContainer>
            <div className='flex flex-2 w-full'>
                {children}
            </div>
            <div className='flex flex-1'>
                <DeleteAccount />
            </div>
        </WrapperContainer>
    );
}
