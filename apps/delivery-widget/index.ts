import App from './src';
var init = async function (options: any) {
    console.info('gras widget init, options: ', options);
    var g = document.createElement("div")
    g.setAttribute("id", "gras-widget-root")
    g.setAttribute('class', "gras-widget-wrapper")
    const root = document.getElementById('root')
    root?.appendChild(g);
    await App.init();
};

function grasWidget() {
    return {
        init: init
    }
};

window.grasWidget = grasWidget;

export { };
