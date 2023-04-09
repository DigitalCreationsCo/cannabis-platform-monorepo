import { useNavigate } from "react-router-dom"

function Button() {

    const history = useNavigate()
    
    const handleClick = () => {
        history("/checkout")
    }
    
    return (
        <button onClick={handleClick} className="border absolute bottom-0 right-0 m-2 p-4 rounded-full bg-primary">
            <h1>Delivery by Gras</h1>
        </button>
    )
}

export default Button