import { useCheckHrefIncludes } from '@cd/core-lib/src/utils/useCheckHrefIncludes'
import CloseButton from "@cd/ui-lib/src/components/button/CloseButton"
import { Paragraph, Small } from "@cd/ui-lib/src/components/Typography"
import { getBreakpointValue } from "@cd/ui-lib/src/hooks/useBreakpoint"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { twMerge } from "tailwind-merge"
import { DeliveryWidgetConfigOptions } from '../..'
import WidgetView, { WidgetViewProps } from "./WidgetView"

function Button({ className, expandWidget, setExpandWidget, key, name }: WidgetViewProps & DeliveryWidgetConfigOptions) {
    
    const openWidget = () => setExpandWidget(true)

    const closeWidget = (event:any) => {
      event.stopPropagation()
      setExpandWidget(false)
    }

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
    useEffect(() => {
      useCheckHrefIncludes('checkout') ? history('/checkout') : null 
    })

    const md = getBreakpointValue('md');
    
    return (
    <div onClick={openWidget} className={twMerge([styles.capsule, className])}>
      {expandWidget ? 
        <div className="flex flex-row items-center">
            <div className="p-6"></div>

            <div className="flex flex-col p-2">
              <Paragraph className="m-auto" color="light">
                {name || 'Your dispensary' } is teaming up with Gras for home delivery. </Paragraph>
                
              <Small className="m-auto" color="light">
                Click here during checkout to get started.</Small>
            </div>
            
            <div>
            <CloseButton theme={'light'} className="relative p-4 border" onClick={closeWidget} />
            </div>
            
        </div> :
        <div className="flex flex-col items-center">
          <div className={twMerge("tooltip tooltip-open bg-primary absolute top-0 tooltip-primary")} 
          data-tip="Click to learn more!"></div>

          { screenwidth <= md ? 
          <Paragraph color="light">
            Delivery by Gras available at checkout</Paragraph> 
            : <>
          <Paragraph color="light">Delivery by Gras</Paragraph>
          <Small color="light">now at checkout</Small></>}

        </div>}
    </div>
    )
}

export default WidgetView(Button)

const styles = {
  capsule: ["relative", "cursor-pointer", "md:rounded-full"],
}