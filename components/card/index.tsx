import React from 'react'

interface CardProps {
    children: React.ReactNode
    className?: string,
    onClick?: (() => void) | undefined
}

export default function Card({ children, className, onClick }: CardProps) {

    const baseClasses = 'p-6 border border-gray-700 rounded-lg';
    const finalClasses = `${baseClasses} ${className}`;
    return (
        <div className={finalClasses} onClick={onClick}>
            {children}
        </div>
    )
}
