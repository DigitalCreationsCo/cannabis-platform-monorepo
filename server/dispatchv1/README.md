DISPATCH SERVER REFACTOR

ADD A MESSAGING ADAPTER
    INCLUDES FEATURE CONFIGURATION
    FEATURES:
        SMS MESSAGE
        SOCKET MESSAGING
    SEND MESSAGE EVENTS TO ACTIVE FEATURES

SMS IS THE PRIMARY MESSAGE SYSTEM NOW.
IN THE FUTURE, SOCKET FEATURE WILL BE TURNED OFF. SMS MESSAGE WILL STAY ON AS SUPPLMENT PLATFORM MESSAGES.

pattern example:

change event: (event) => {
    Messenger.send(room, 'new order')

    // this pattern allows for clients that are included in socket rooms, or customers and drivers that are not using a client app
    // non-client customers: ordering the web app
    // in-app customers
    // non-app drivers: using sms message instruction and directions apps for navigation
    // in-app drivers: using driver client mobile app

    ...
    // emit event to customer in the room
    send(room, event) {
        if (features.sms.enabled === true) {
            sms.send(room.customer.phone, message)
        }
        if (features.dispatch_socket.enabled === true) {
            room.customer.socket(event, message)
        }
    }
}