// this script is loaded in dispensary webpages to create the widget.

// TODO: Encrypt all the widget code.
// pass a public key into the widget, for decryption.

// when is it decrypted? idk. maybe when it's loaded into the browser.
// use crypto browser api

function initDeliveryWidget() {
	console.log('initDeliveryWidget called');
	window.grasWidget().init();
	console.log('grasWidget initialized');
}
function initialize(i, t) {
	var e;
	i.getElementById(t)
		? initDeliveryWidget()
		: (((e = i.createElement('div')).id = t),
		  (e.src = 'http://localhost:8080'),
		  (e.async = !0),
		  (e.onload = initDeliveryWidget),
		  i.head.appendChild(e));
}
// script id can be used to verify authentication tokens
function initiateCall() {
	initialize(document, 'gras-widget-root');
}
window.addEventListener
	? window.addEventListener('load', initiateCall, !1)
	: window.attachEvent('load', initiateCall);
