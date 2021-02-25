import { LitElement, html, css } from 'lit-element';
import { isMobileDevice } from '../utils/media';

export default class Table extends LitElement {
    constructor() {
        super();
        this.data = [];
        this.loading = false;
    }

    static get properties() {
        return {
            data   : { type: Array },
            loading: { type: Boolean },
        };
    }

    static get styles() {
        return css`
        
            /* Table */
            
            table {
                border-collapse: collapse;
                width: 100%;
            }

            table td, table th {
                border: 1px solid #ddd;
                padding: 8px;
            }

            table tr:nth-child(even){
                background-color: rgb(238 238 238);
            }

            table tr:hover {
                background-color: #ddd;
            }

            table th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: left;
                background-color: #68A304;
                color: white;
            }

            /*   CARD  */
            
            .cards .card {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-content: stretch;
                align-items: flex-start;
                padding: 10px 15px;
                border-radius: 5px;
            }
            
            .card .headers {
                order: 0;
                flex: 0 1 auto;
                align-self: auto;
                margin-right: 20%;
            }
            
            .card .values {
                order : 1;
                flex: 1 1 auto;
                align-self: auto;
            }
            
           .card span {
                display: block;
           }
           
           .card.odd {
                background: rgb(238 238 238);
            
           }
      `;
    }

    /**
     * Get all the cells configurations with the value to be painted, the dataIndex and the header
     *
     * @param record
     * @returns {*[]}
     * @private
     */
    _getRecordCells(record) {
        const columns = this.children, cells = [];
        for (const column of columns) {
            const value = record?.[column?.dataIndex] ?? null;
            cells.push({
                value: value
                    ? column.columnTypes[column.type]?.(value) ?? value
                    : '',
                dataIndex   : column?.dataIndex ?? '',
                columnHeader: column?.header ?? '',
            });
        }

        return cells.map(cell => cell);
    }

    /**
     *
     * @returns {TemplateResult}
     * @private
     */
    _renderDesktopData() {
        return html`
            ${this.data.map(record => html`
                <tr>
                    ${this._getRecordCells(record).map(({ value }) => html`<td>${value}</td>`)}                
                </tr>
            `)}
        `;
    }

    /**
     * For non mobile devices, it renders the HTMLTableRowElement for the HTMLTable header
     * @returns {TemplateResult[]}
     * @private
     */
    _renderDesktopHeaders() {
        const columns = this.children, headers = [];
        for (const column of columns) {
            headers.push(column?.header ?? '');
        }

        return headers.map(header => html`<th>${header}</th>`);
    }

    /**
     * Render the head and the body of the table for non mobile devices
     * @returns {TemplateResult}
     * @private
     */
    _getDesktopTable() {
        return html`
            <table>
                <thead>
                    <tr>
                        ${this._renderDesktopHeaders()}
                    </tr>
                </thead>
                <tbody>
                    ${this._renderDesktopData()}
                </tbody>
            </table>
        `;
    }

    /**
     * For mobile devices, it renders the content ot a record card, with the headers block at the left
     * and the values on the right side
     *
     * @param record
     * @returns {TemplateResult}
     * @private
     */
    _getCard(record) {
        const recordCells = this._getRecordCells(record);
        return html`
            <div class="headers">
                ${recordCells.map(({ columnHeader }) => html`<span class="header">${columnHeader}</span>`)}
            </div>
            <div class="values">
                ${recordCells.map(({ value }) => html`<span class="value">${value}</span>`)}
            </div>
        `;
    }

    /**
     * It renders the data in cards format for mobile devices
     *
     * @returns {TemplateResult}
     * @private
     */
    _getMobileCards() {
        return html`
            <div class="cards">
                ${this.data.map((record, index) => html`
                    <div class="card ${index%2 ? '' : 'odd'}">
                        ${this._getCard(record)} 
                    </div>
                `)}
            </div>
        `;
    }

    render() {
        return this.loading
            ? html`<span class="loader">Loading...</span>`
            : html`${isMobileDevice() ? this._getMobileCards() : this._getDesktopTable()}`;
    }
}

customElements.define('delavega-table', Table);
