import App from './App';

type DispensaryParameters = {
    dispensaryKey: string;
    dispensaryName?: string;
}

type WidgetOptions = {

}

export type CheckoutWidgetConfigOptions =
    DispensaryParameters &
    WidgetOptions;

var init = async function (config: CheckoutWidgetConfigOptions) {
    console.info('gras widget init, config options: ', config);
    var g = document.createElement("div")
    g.setAttribute("id", "gras-widget-root")
    g.setAttribute('class', "gras-widget-wrapper")
    document.body.appendChild(g);
    await App.init(config);

    // need es2020 for dynamic import
    // import('./App').then(async ({ default: App }) => await App.init(config));
};

function grasWidget() {
    return {
        init: init
    }
};

window.grasWidget = grasWidget;

export { };
