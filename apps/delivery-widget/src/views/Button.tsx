import { H4, Paragraph } from "@cd/ui-lib/src/components/Typography"
import { getBreakpointValue } from "@cd/ui-lib/src/hooks/useBreakpoint"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { checkHrefCheckout } from "../util"
import WidgetView, { ViewProps } from "./WidgetView"

function Button({ className }: ViewProps) {
    const [screenwidth, setScreenwidth] = useState(window.innerWidth)
    
    const setWindowDimensions = () => {
        setScreenwidth(window.innerWidth)
      }
      useEffect(() => {
        window.addEventListener('resize', setWindowDimensions);
        return () => {
          window.removeEventListener('resize', setWindowDimensions)
        }
      }, [])

    const history = useNavigate()
    
    const handleClick = () => {
        history("/checkout")
    }

    useEffect(() => {
        checkHrefCheckout() ? history("/checkout") : null
    }, [window.location.href])
    
    const md = getBreakpointValue('md')
    return (
    <button onClick={handleClick} className={twMerge(className, 'md:rounded-full md:w-[300px]', "tooltip tooltip-open")} data-tip="Click to learn more!">
        <div className="flex flex-col items-center">
            {
            screenwidth <= md ? <H4 color="light">Delivery by Gras available at checkout</H4> : 
            <>
            <H4 color="light">Delivery by Gras</H4>
            <Paragraph color="light">now at checkout</Paragraph>
            </>
            }
        </div>
    </button>
    )
}

export default WidgetView(Button)