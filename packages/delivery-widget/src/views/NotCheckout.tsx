// import { CloseButton } from "@cd/shared-ui"
import { useEffect } from "react"
import { twMerge } from "tailwind-merge"
import { checkHrefCheckout } from "../util"
import WidgetView, { ViewProps } from "./WidgetView"

function NotCheckout({ className }:ViewProps) {
    useEffect(() => {
        checkHrefCheckout()
    }, [window.location.href])

    return (
        <div className={twMerge(className)}>
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                <p>Gras and 'dispensary' are teaming up to delivery your goods straight to your home. </p>
                <h1>Click here at checkout for your order delivery!</h1>
                </div>
                {/* <CloseButton /> */}
            </div>
        </div>
    )
}

// function CloseButton() {
//     return (
//         <div className="cursor-default py-2 text-light text-3xl">
//             x
//         </div>
//     );
// }

export default WidgetView(NotCheckout)