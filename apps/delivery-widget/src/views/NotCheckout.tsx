import CloseButton from "@cd/ui-lib/src/components/CloseButton"
import { H4, Paragraph } from "@cd/ui-lib/src/components/Typography"
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
        <div className={twMerge('md:rounded-full', className)}>
            <div className="flex flex-row justify-between m-auto place-items-center">
                <div className="flex flex-col grow p-2">
                <Paragraph className="m-auto" color="light">Your dispensary is teaming up with Gras for home delivery. </Paragraph>
                <H4 className="m-auto" color="light">Click here during checkout to get started.</H4>
                </div>
                <CloseButton theme={'dark'} className="relative p-4" onClick={() => history("/")} />
            </div>
        </div>
    )
}

export default WidgetView(NotCheckout)