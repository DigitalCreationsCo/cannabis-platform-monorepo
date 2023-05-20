import App from './src';

export type DeliveryWidgetConfigOptions = {
    key: string;
    name?: string;
}

var init = async function (config: DeliveryWidgetConfigOptions) {
    console.info('gras widget init, config options: ', config);
    var g = document.createElement("div")
    g.setAttribute("id", "gras-widget-root")
    g.setAttribute('class', "gras-widget-wrapper")
    document.body.appendChild(g);
    await App.init(config);
};

function grasWidget() {
    return {
        init: init
    }
};

window.grasWidget = grasWidget;

export { };
