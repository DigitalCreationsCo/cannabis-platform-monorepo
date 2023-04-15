import { jsx as _jsx } from "react/jsx-runtime";
const WidgetView = (View) => {
    return (_jsx("div", { className: "ring-2 ring-offset-2 min-h-full min-w-full bg-primary rounded-full", children: _jsx(View, { className: "p-8" }) }));
};
export default WidgetView;
