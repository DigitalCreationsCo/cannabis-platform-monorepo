
function Button({ onClick, children, state }: { onClick: React.MouseEventHandler<HTMLButtonElement>; children: any;  state: Number}) {
    return (
        <button onClick={ onClick } className="bg-blue-900">
            this button is imported! from shared-ui right now
            { state }{ children }
        </button>
    )
}

export default Button