function initDeliveryWidget() {
    window.grasWidget.init();
}
function initialize(i: Document, t: string) { 
    var e;
    i.getElementById(t) ? initDeliveryWidget() : ((e = i.createElement("script")).id = t, e.src = "localhost:8080", e.async = !0, e.onload = initDeliveryWidget, i.head.appendChild(e))
}
function initiateCall() {initialize(document, "gras-widget-script")}
window.addEventListener ? window.addEventListener("load", initiateCall, !1) : window.attachEvent("load", initiateCall);