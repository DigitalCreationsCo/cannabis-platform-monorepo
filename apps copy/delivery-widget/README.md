widget app is found in /src directory

The delivery-widget is a react app, that is designed to be injected to client side pages,
for use on dispensary webpages such as ecommerce page.

How does it work?
    init script is loaded into any html page intended for Gras Delivery Widget
    init script will init the widget, or create a script that loads from app url.

    app url will serve:
    the entry file appending the widget to window
    the widget javascript bundle

Developer notes: (sensitive)
    How to serve the widget to any html document:

    include the initDeliveryWidget script on html document, before the body.
    the script will hit localhost:8080, or the server url that serves the widget files.
    localhost:8080 -> will set var widget to load widget files in the window.
    widget.init is called to create the widget using javascript, maybe using express.

    widget.init creates a dom element as root for react app, and initializes react app.

    create a dom element in the document that will render the view from express app
    add the static js bundle to graswidget script

Next steps: Development: - 
Redirect user to stripe checkout on our webpage, or preloaded stripe checkout page.
Handle user info such as identification and age, collect address for delivery,
confirm the checkout, confirm the destination,

Send order status updates to mobile number, or show them over webpage (mobile preferred)
