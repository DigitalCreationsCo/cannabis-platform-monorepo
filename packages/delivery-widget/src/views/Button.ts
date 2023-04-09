import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <h1>Gras Delivery Widget Button</h1>
            <p>
                <a href="/posts" data-link>View recent posts</a>.
            </p>
        `;
    }
}