import React from "react";

class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className="border absolute bottom-0 right-0 m-2 p-4 rounded-full bg-primary">
                <h1><a href="/posts">Delivery by Gras</a></h1>
            </div>
        )
    }
}

export default Button