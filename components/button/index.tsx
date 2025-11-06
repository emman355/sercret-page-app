import React from 'react'
import Typography from '../typography'

interface ButtonProps {
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>, 
    type?: 'button' | 'submit' | 'reset',
    buttonText: string,
    ariaLabel?: string,
    textStyle?: string,
    disabled?: boolean,
}

export default function Button({ buttonText, className, onClick, type, ariaLabel, textStyle, disabled = false }: ButtonProps) {
    const baseClasses = 'transition-all duration-200 transform hover:scale-[1.05] active:scale-95 rounded-lg';
    const finalClasses = `${baseClasses} ${className}`;
    const baseTextStyle = 'font-semibold px-5 py-2 rounded-lg shadow-md';
    const finalTextClasses = `${baseTextStyle} ${textStyle}`;
    return (
        <button
            type={type}
            onClick={onClick}
            className={finalClasses}
            aria-label={ariaLabel}
            disabled={disabled}
        >
            {/* Using Typography for text consistency */}
            <Typography variant='body' className={finalTextClasses}>
                {buttonText}
            </Typography>
        </button>
    )
}
