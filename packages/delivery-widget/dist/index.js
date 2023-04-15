import App from './src';
var init = function () {
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
    App.init();
};
function grasWidget() {
    return {
        init: init
    };
}
;
window.grasWidget = grasWidget;
