var init = function () {
    console.log('this is the gras widget init function, served from development url');
};
var grasWidget = {
    init: init
};
window.grasWidget = grasWidget;
console.log('gras widget loaded');