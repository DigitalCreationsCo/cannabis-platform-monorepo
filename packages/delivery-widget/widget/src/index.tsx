import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return (<div>Hello Widget</div>)
}
export default ReactDOM.render(
    React.createElement(App, null),
    document.getElementById('app')
  );