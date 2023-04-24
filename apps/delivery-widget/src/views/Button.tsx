import { useCheckHrefIncludes } from "@cd/core-lib/src/utils/useCheckHrefIncludes"
import CloseButton from "@cd/ui-lib/src/components/CloseButton"
import { H4, Paragraph } from "@cd/ui-lib/src/components/Typography"
import { getBreakpointValue } from "@cd/ui-lib/src/hooks/useBreakpoint"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import WidgetView, { ViewProps } from "./WidgetView"

function Button({ className, expandWidget, setExpandWidget }: ViewProps) {
    const openWidget = () => setExpandWidget(true)

    const closeWidget = (event:any) => {
      event.stopPropagation()
      setExpandWidget(false)
    }

    const [screenwidth, setScreenwidth] = useState(window.innerWidth)
    
    const setWindowDimensions = () => {
      setScreenwidth(window.innerWidth)
    }
    
    const history = useNavigate()

    useEffect(() => {
      function goToCheckout() {
          console.log('is checkout? ', useCheckHrefIncludes('checkout'))
          useCheckHrefIncludes('checkout') ? history('/checkout') : null 
      }
      goToCheckout()
    })
  
    useEffect(() => {
      window.addEventListener('resize', setWindowDimensions);
      return () => {
        window.removeEventListener('resize', setWindowDimensions)
      }
    }, [])
    
    const md = getBreakpointValue('md')

    return (
    <div onClick={openWidget} className={twMerge([className, "md:rounded-full", "tooltip tooltip-open"])} data-tip="Click to learn more!">
      {expandWidget ? 
        <div className="flex flex-row justify-between m-auto place-items-center">
            <div className="flex flex-col grow p-2">
            <Paragraph className="m-auto" color="light">Your dispensary is teaming up with Gras for home delivery. </Paragraph>
            <H4 className="m-auto" color="light">Click here during checkout to get started.</H4>
            </div>
            <CloseButton theme={'dark'} className="relative p-4" onClick={closeWidget} />
        </div> :
        <div className="flex flex-col items-center">{ 
          screenwidth <= md ? 
          <H4 color="light">Delivery by Gras available at checkout</H4> : <>
          <H4 color="light">Delivery by Gras</H4>
          <Paragraph color="light">now at checkout</Paragraph></>}
        </div>}
    </div>
    )
}

export default WidgetView(Button)