import React from 'react'

interface WrapperContainerProps {
    children: React.ReactNode
    className?: string,
}

export default function WrapperContainer({ children, className }: WrapperContainerProps) {
    const baseClasses = 'flex flex-row max-sm:flex-col space-y-6 mx-auto p-8 max-w-7xl lg:gap-16';
    const finalClasses = `${baseClasses} ${className}`;
    return (
        <div className={finalClasses}>
            {children}
        </div>
    )
}
