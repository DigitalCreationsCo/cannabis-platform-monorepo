import { twMerge } from "tailwind-merge"

export type ViewProps = {
    className?: string | string[] 
}

const WidgetView = (View:({ className}: ViewProps) => JSX.Element) => {
    const styles = {
        container: ["relative"],
        responsive: ["w-screen md:w-auto"],
        theme: ["ring-2 ring-offset-2 rounded md:rounded-full bg-primary p-4 w-full"]
    }
    return (
        <div className={twMerge([styles.container, styles.responsive])}>
            <View className={twMerge([styles.theme])} />
        </div>
    )
}
export default WidgetView