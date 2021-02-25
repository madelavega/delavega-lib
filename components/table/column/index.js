import { LitElement, html } from 'lit-element';

export default class TableColumn extends LitElement {
    constructor() {
        super();
    }

    static get properties() {
        return {
            dataIndex: { type: String },
            header   : { type: String },
        };
    }

    render() {
        return html`<th></th>`;
    }
}

customElements.define('delavega-table-column', TableColumn);
