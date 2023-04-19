import CloseButton from "@cd/ui-lib/src/components/CloseButton"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { checkHrefCheckout } from "../util"
import WidgetView, { ViewProps } from "./WidgetView"

function NotCheckout({ className }:ViewProps) {
    const history = useNavigate()
    
    useEffect(() => {
        checkHrefCheckout()
    }, [window.location.href])

    return (
        <div className={twMerge(className)}>
            <div className="flex flex-row items-center whitespace-wrap">
                <div className="flex flex-col p-2">
                <p>Your dispensary is teaming up with Delivery by Gras to offer home delivery of your goods. </p>
                <h1 className="m-auto">Click here during checkout to start your delivery.</h1>
                </div>
                <CloseButton theme={'dark'} className="p-4" onClick={() => history("/")}/>
            </div>
        </div>
    )
}

export default WidgetView(NotCheckout)