import { LitElement, html } from 'lit-element';

/**
 * @class TableColumn
 *
 * This component must be wrapped by {@link Table}
 *
 * TODO It should have a type (for example currency, date, numbers... and all that with i18n...) for the data for this column.
 * Must dispatch an event when it's clicked, to sort Table data information
 *
 */
export default class TableColumn extends LitElement {
    constructor() {
        super();
        this.columnTypes = {
            /**
             * current supported currency only €.
             * TODO support more currencies, maybe with currencyType attribute
             */
            currency: val => `€${val}`,
        };
    }

    static get properties() {
        return {
            dataIndex: { type: String },
            header   : { type: String },
            type     : { type: String },
        };
    }

    onColumClick() {
        //TODO dispatch an sort event with the information about the current sort state. Table must listen it to data sorting
    }

    render() {
        return html`<th @click="${this.onColumClick}"></th>`;
    }
}

customElements.define('delavega-table-column', TableColumn);
