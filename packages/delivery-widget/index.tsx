
var init = function () {
    // create widget root element
    // const root = document.createElement("div")
    // root.setAttribute("id", "gras-widget-root")
    // root.appendChild(document.createTextNode("A div created with Gras Widget init script!"));

    // const template = `
    // <nav class="nav">
    //     <a href="/" class="nav__link" data-link>Dashboard</a>
    //     <a href="/posts" class="nav__link" data-link>Posts</a>
    //     <a href="/settings" class="nav__link" data-link>Settings</a>
    // </nav>
    // <div id="app"></div>
    // <script>${widget}</script>`
    // root.innerHTML = template
    // document.body.appendChild(root);

    console.log('hello widget')
    const root = document.createElement("div")
    root.setAttribute("id", "root")
    document.body.appendChild(root);

    ReactDOM.render(
        React.createElement(App, null),
        document.getElementById('root')
    );
};

import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return (<div>Hello Widget</div>)
}
export default ReactDOM.render(
    React.createElement(App, null),
    document.getElementById('root')
  );

function grasWidget() {
    return {
        init: init
    }
};

window.grasWidget = grasWidget;