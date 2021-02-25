import { LitElement, html, css } from 'lit-element';
import { isMobileDevice } from '../utils/media';

export default class Table extends LitElement {
    constructor() {
        super();
        this.data = [];
    }

    static get properties() {
        return {
            data: { type: Array },
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
     *
     * @param record
     * @returns {*[]}
     * @private
     */
    _getRecordCells(record) {
        const columns = this.children, cells = [];
        for (const column of columns) {
            cells.push({
                value       : record?.[column?.dataIndex] ?? '',
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

    _renderDesktopHeaders() {
        const columns = this.children, headers = [];
        for (const column of columns) {
            headers.push(column?.header ?? '');
        }

        return headers.map(header => html`<th>${header}</th>`);
    }

    /**
     *
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

    _getCard(record) {
        const recordCells = this._getRecordCells(record);
        return html`
            <div class="headers">
                ${recordCells.map(({ columnHeader }) => html`<span class="header">${columnHeader}</span>`)}
            </div>
            <div class="values">
                ${recordCells.map(({ value }) => html`<span class="header">${value}</span>`)}
            </div>
        `;
    }

    /**
     *
     * @returns {TemplateResult}
     * @private
     */
    _getMobileTable() {
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
        return isMobileDevice() ? this._getMobileTable() : this._getDesktopTable();
    }
}

customElements.define('delavega-table', Table);
