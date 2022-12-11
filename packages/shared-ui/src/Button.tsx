<<<<<<< Updated upstream
function Button({ onClick, children, state }: { onClick: React.MouseEventHandler<HTMLButtonElement>; children: any;  state: Number}) {
    return (
        <button onClick={ onClick } className="bg-blue-500">
            this button is imported from shared-ui right now
            { state }
            
                { children }
        </button>
    )
=======
import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
>>>>>>> Stashed changes
}

function Button({ onClick, children }: ButtonProps) {
    return (
        <button onClick={onClick} className="bg-green-400">
            this button is imported! from shared-ui right now
            {children}
        </button>
    );
}

export default Button;
