import fs from 'fs';
import path from 'path';

var init = function () {
    // create widget root element
    const root = document.createElement("div")
    root.setAttribute("id", "gras-widget-root")
    root.appendChild(document.createTextNode("A div created with Gras Widget init script!"));
    const template = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
    root.innerHTML = template
    document.body.appendChild(root);
};

function grasWidget() {
    return {
        init: init
    }
};

window.grasWidget = grasWidget;