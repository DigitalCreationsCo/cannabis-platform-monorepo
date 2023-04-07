var init = function () {
    function addElement() {
        // create a new div element
        const newDiv = document.createElement("div");
      
        // and give it some content
        const newContent = document.createTextNode("A div created with Gras Widget init script!");
      
        // add the text node to the newly created div
        newDiv.appendChild(newContent);
      
        // add the newly created element and its content into the DOM
        const currentDiv = document.getElementById("div1");
        document.body.insertBefore(newDiv, currentDiv);
        }
    addElement();
};
var grasWidget = {
    init: init
};
window.grasWidget = grasWidget;