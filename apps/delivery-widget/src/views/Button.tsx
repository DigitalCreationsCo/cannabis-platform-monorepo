import CloseButton from "@cd/ui-lib/src/components/CloseButton"
import { H4, Paragraph } from "@cd/ui-lib/src/components/Typography"
import { getBreakpointValue } from "@cd/ui-lib/src/hooks/useBreakpoint"
import { useEffect, useState } from "react"
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
    
    // function goToCheckout() {
    //   console.log('is checkout? ', useCheckHrefIncludes('checkout'))
    //   useCheckHrefIncludes('checkout') ? history('/checkout') : null 
    // }

    // useEffect(() => {
    //   console.log('window location: ', window.location.href)
    //   console.log('widget rendered: Button')
    // })

    // useEffect(() => {
    //   goToCheckout()
    //   return () => {
    //     goToCheckout()
    //   }
    // }, [])

    // useEffect(() => {
    //   console.log('window location changed')
    //   goToCheckout()
    //   return () => {
    //     console.log('window location changed cleanup')
    //   }
    // }, [window.location])
  
    useEffect(() => {
      window.addEventListener('resize', setWindowDimensions);
      return () => {
        window.removeEventListener('resize', setWindowDimensions)
      }
    }, [])

    const md = getBreakpointValue('md')
    return (
    <div onClick={openWidget} className={twMerge([className, "relative", "cursor-pointer", "md:rounded-full"])}>
      {expandWidget ? 
        <div className="flex flex-row justify-between m-auto place-items-center">
            <div className="p-6"></div>
            <div className="flex flex-col grow p-2">
            <Paragraph className="m-auto" color="light">Your dispensary is teaming up with Gras for home delivery. </Paragraph>
            <H4 className="m-auto" color="light">Click here during checkout to get started.</H4>
            </div>
            <CloseButton theme={'dark'} className="relative p-4" onClick={closeWidget} />
        </div> :
        <div className="flex flex-col items-center">
        <div className={twMerge("tooltip tooltip-open absolute top-0 tooltip-primary")} data-tip="Click to learn more!"></div>
          {
          screenwidth <= md ? 
          <H4 color="light">Delivery by Gras available at checkout</H4> : <>
          <H4 color="light">Delivery by Gras</H4>
          <Paragraph color="light">now at checkout</Paragraph></>}
        </div>}
    </div>
    )
}

export default WidgetView(Button)