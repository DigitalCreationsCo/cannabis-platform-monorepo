import TextContent from "@cd/core-lib/src/constants/textContent"
import { useCheckHrefIncludes } from '@cd/core-lib/src/utils/useCheckHrefIncludes'
import CloseButton from "@cd/ui-lib/src/components/button/CloseButton"
import { Paragraph, Small } from "@cd/ui-lib/src/components/Typography"
import { getBreakpointValue } from "@cd/ui-lib/src/hooks/useBreakpoint"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { twMerge } from "tailwind-merge"
import { DeliveryWidgetConfigOptions } from '..'
import logo from '../../public/logo120.png'
import WidgetView, { WidgetViewProps } from "./WidgetView"

function Button({ className, expandWidget, setExpandWidget, dispensaryName }: WidgetViewProps & DeliveryWidgetConfigOptions) {
    
    const openWidget = () => setExpandWidget(true)

    const closeWidget = (event:any) => {
      event.stopPropagation()
      setExpandWidget(false)
    }

    const [screenwidth, setScreenwidth] = useState(window.innerWidth)

    const setWindowDimensions = () => {
      setScreenwidth(window.innerWidth)
    }
    
    const md = getBreakpointValue('md');

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
    
    
    const styles = {
      capsule: [
        "relative", 
        expandWidget ? "cursor-default" : 'cursor-pointer', 
        'min-h-[44px]',
        'self-center',
        "md:rounded-full"
      ],
    }

    return (
    <div onClick={openWidget} className={twMerge([styles.capsule, className])}>
      {expandWidget ? 
        <div className="flex flex-row items-center">
            <div className="p-6"></div>

            <div className="flex flex-col p-2">
              <Paragraph className="m-auto" color="light">
                {dispensaryName || 'Your dispensary' } is teaming up with Gras for home delivery. </Paragraph>
                
              <Small className="m-auto text-primary-light" color="light">
                Get started at checkout!</Small>
            </div>
            
            <div>
            <CloseButton 
            iconSize={32}
            className="relative p-2 pr-4 text-light"
            theme={'light'} 
            onClick={closeWidget} 
            />
            </div>
            
        </div> :
        <div className="justify-center flex items-center h-full">

          { screenwidth >= md && 
          <img 
          src={logo} 
          alt="Delivery By Gras" 
          height={40} 
          width={40}
          className='object-contain'
          /> }

          { screenwidth <= md ? 
          <Small color="light" className='items-center'>
            Delivery by Gras available at checkout !</Small> 
            : <>
          <Small color="light" className='items-center'>
            Delivery by Gras{TextContent.char.NBSP}</Small>
          <Small color="light" className='items-center'>
            now at checkout</Small></>}
            
          <div className="w-[20px]"></div>

        </div>}
    </div>
    )
}

export default WidgetView(Button)
