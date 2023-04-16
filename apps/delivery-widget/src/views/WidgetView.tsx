export type ViewProps = {
    className?: string | string[] 
}

const WidgetView = (View:({ className}: ViewProps) => JSX.Element) => {
    return (
        <div className="ring-2 ring-offset-2 min-h-full min-w-full bg-primary rounded-full">
            <View className="p-8" />
        </div>
    )
}
export default WidgetView