import { useOnClickOutside } from "@cd/ui-lib/src/hooks";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export type ViewProps = {
    className?: string | string[];
    expandWidget: boolean;
    setExpandWidget: (expandWidget: boolean) => void;
}

const WidgetView = (View:(props:ViewProps) => JSX.Element) => () => {
    const [expandWidget, setExpandWidget] = useState(false)
    const ref = useRef(null);
    
    useClickOutside(ref, () => setExpandWidget(false))
    
    const styles = {
        container: ["relative"],
        responsive: ["w-screen md:w-auto"],
        theme: ["ring-2 ring-offset-2 bg-primary p-4 w-full"]
    }
    return (
        <div ref={ref} className={twMerge([styles.container, styles.responsive])} >
        <View
            expandWidget={expandWidget} 
            setExpandWidget={setExpandWidget} 
            className={twMerge([styles.theme])} />
        </div>
        )
    }

function useClickOutside (ref: any, handler: () => void) {
    useOnClickOutside(ref, () => {
        handler()
    });
}

export default WidgetView