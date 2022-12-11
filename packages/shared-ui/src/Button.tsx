import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ onClick, children }: ButtonProps) {
    return (
        <button onClick={onClick} className="bg-green-400">
            {children}
        </button>
    );
}

export default Button;
