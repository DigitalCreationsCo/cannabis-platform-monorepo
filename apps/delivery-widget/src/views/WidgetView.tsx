import { useCheckHrefIncludes } from '@cd/core-lib/src/utils/useCheckHrefIncludes';
import { useOnClickOutside } from "@cd/ui-lib/src/hooks";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { twMerge } from "tailwind-merge";
import { DeliveryWidgetConfigOptions } from '..';

export interface WidgetViewProps {
    className?: string | string[];
    expandWidget: boolean;
    setExpandWidget: (expandWidget: boolean) => void;
}

const WidgetView = (View:(props:WidgetViewProps & DeliveryWidgetConfigOptions) => JSX.Element) => (props: DeliveryWidgetConfigOptions) => {
    const history = useNavigate()
    let pathname = location.pathname;
    useEffect(() => {
        function checkPath() {
            if (location.pathname != pathname) {
                pathname = location.pathname;
                // console.log('is checkout? ', useCheckHrefIncludes('checkout'))
                useCheckHrefIncludes('checkout') ? history('/checkout') : history('/')
            }
        }
        window.addEventListener("click", checkPath);
        return () => {
            window.removeEventListener('click', checkPath)
        }
    })
    const [expandWidget, setExpandWidget] = useState(false)
    
    const ref = useRef(null);
    useOnClickOutside(ref, () => setExpandWidget(false));
    
    const styles = {
        container: ["relative"],
        responsive: ["w-screen md:w-auto"],
        theme: ["ring-2 ring-offset-2 bg-primary", "p-4 w-full"],
        hover: [!expandWidget && `hover:bg-primary-light transition`]
    }
    return (
        <div ref={ref} className={twMerge([styles.container, styles.responsive])} >
        <View
            {...props}
            expandWidget={expandWidget} 
            setExpandWidget={setExpandWidget} 
            className={twMerge([styles.theme, styles.hover])}
            />
        </div>
        )
    }

export default WidgetView