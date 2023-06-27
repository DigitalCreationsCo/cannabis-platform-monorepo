import { CarbonIconType } from '@carbon/icons-react';
import React, { ReactEventHandler, SVGAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import IconButton from './button/IconButton';
import FlexBox from './FlexBox';
import { Small } from './Typography';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    containerClassName?: string;
    maxNumber?: number;
    name?: string;
    label?: string;
    justifyLabel?: 'left' | 'center' | 'right'
    value?: string | number;
    placeholder?: string;
    defaultValue?: string | number;
    onChange: ReactEventHandler;
    onBlur?: ReactEventHandler;
    error?: boolean;
    helperText?: string | false;
    insertIcon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | CarbonIconType;
    onClickIcon?: any;
    inputRef?: any;
};
function TextField({
    className,
    containerClassName,
    maxNumber,
    name,
    type,
    error,
    value,
    label,
    justifyLabel,
    placeholder,
    defaultValue,
    onChange,
    onBlur,
    helperText,
    insertIcon,
    onClickIcon,
    inputRef,
    ...props
}: TextFieldProps) {
    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = { ...props };
    const [focus, setFocus] = React.useState(false);
    const styles = {
        flexContainer: 'space-x-0 space-y-0 w-full', 
        label: ['px-2', 'w-full', justifyLabel && `text-${justifyLabel}` ]
    };
    return (
        <FlexBox className={twMerge(styles.flexContainer, containerClassName, 'text-dark')}>
            {label && (
                <FlexBox className="items-start w-full">
                    <label className={twMerge(styles.label)}><Small>{label}</Small></label>
                </FlexBox>
            )}
            <FlexBox className="grow w-full flex-row items-center">
                {insertIcon && (
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onClickIcon && onClickIcon(e);
                        }}
                        className={twMerge(
                            'bg-transparent hover:bg-transparent md:hover:bg-transparent focus:bg-transparent shadow-none px-0 pl-2 m-0 w-min h-min place-self-center'
                        )}
                        Icon={insertIcon}
                    />
                )}
                <input
                    ref={inputRef}
                    onFocus={() => {
                        if (onfocus) onfocus;
                        setFocus(true);
                    }}
                    name={name}
                    maxLength={maxNumber}
                    defaultValue={defaultValue}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={() => {
                        if (onBlur) onBlur;
                        setFocus(false);
                    }}
                    placeholder={helperText || placeholder}
                    className={twMerge(
                        'text-lg',
                        'bg-light',
                        'items-center',
                        'p-4 rounded-btn',
                        'wh-10',
                        'outline-none focus:outline-none w-full',
                        'shadow-inner',
                        'input-md',
                        focus && 'shadow-md',
                        error && 'input-error border-2',
                        'border',
                        className
                    )}
                    {...inputProps}
                />
            </FlexBox>
        </FlexBox>
    );
}

export default TextField;
