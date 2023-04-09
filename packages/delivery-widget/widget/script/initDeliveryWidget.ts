      function initDeliveryWidget() {
        window.grasWidget().init();
      }
      function initialize(i,t) {
          var e;
          i.getElementById(t) ? initDeliveryWidget() : ((e = i.createElement("script")).id = t, e.src = "http://localhost:4050/index.jsx", e.async = !0, e.onload = initDeliveryWidget, i.head.appendChild(e))
      }
      // script id can be used to verify authentication tokens
      function initiateCall() {initialize(document, "gras-widget-script")}
      window.addEventListener ? window.addEventListener("load", initiateCall, !1) : window.attachEvent("load", initiateCall);