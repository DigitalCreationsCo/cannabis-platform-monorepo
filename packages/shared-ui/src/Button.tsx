function Button({ onClick, children }) {
    return (
        <button onClick={ onClick } className="bg-blue-500">
            this button is imported from shared-ui:{' '}
            { children }</button>
    )
}

export default Button