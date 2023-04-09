import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkHrefCheckout } from "../util"

function Button() {

    const history = useNavigate()
    
    const handleClick = () => {
        history("/checkout")
    }

    useEffect(() => {
        checkHrefCheckout()
    }, [window.location.href])
    
    return (
    <div onClick={handleClick} className="border absolute bottom-0 right-0 m-2 p-4 rounded-full bg-primary">
        { checkHrefCheckout() ? <div className="flex flex-col items-center">
            <h1>Delivery by Gras straight to your door.</h1>
            <p>Click here for delivery checkout!</p>
            </div> : 
            <div className="flex flex-row items-center">
                <h1>Delivery by Gras</h1>
                <p>now at checkout</p>
            </div>
        }
    </div>
    )
}

function CloseButton() {
    return (
        <div className="items-center flex px-2 bg-light text-primary font-bold rounded-full text-3xl">
            x
        </div>
    );
}

export default Button