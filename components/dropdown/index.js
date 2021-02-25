import { LitElement, html, css } from 'lit-element';
import LITERALS from './consts';

export default class DropDown extends LitElement {
    constructor() {
        super();
        this.valueProperty = 'value';
        this.textProperty = 'text';
        this.data = [];
        this.defaultEmptyValue = false;
        this.defaultEmptyValueText = LITERALS.EMPTY_SELECTION_TEXT;
    }

    static get properties() {
        return {
            defaultEmptyValue    : { type: Boolean, attribute: 'default-empty-value' },
            defaultEmptyValueText: { type: String },
            data                 : { type: Array },
            textProperty         : { type: String },
            valueProperty        : { type: String },
            value                : { type: String },
        };
    }

    static get styles() {
        return css`
            select {
                padding: 8px 8px;
                width: 100px;
                border: 1px solid #c0c0c0;
                box-shadow: none;
            }
      `;
    }

    /**
     *
     * @param selectedValue
     * @private
     */
    _onSelect({ target : { value : selectedValue } }) {
        this.value = selectedValue;
        const e = new CustomEvent('selected', {
            detail: { selectedValue },
        });

        this.dispatchEvent(e);
    }

    /**
     *
     * @param value
     * @param text
     * @returns {TemplateResult}
     * @private
     */
    _getOption(value, text) {
        if(value == this.value) {
            return html`<option selected value="${value}">${text}</option>`;
        } else {
            return html`<option value="${value}">${text}</option>`;
        }
    }

    render() {
        return html`
            <select @change="${this._onSelect}"> 
                ${
    [ ...( this.defaultEmptyValue ?
        [{ [this.valueProperty]: LITERALS.EMPTY_VALUE, [this.textProperty]: this.defaultEmptyValueText }] :
        [] ), ...this.data, 
    ]
        .map(({ [this.valueProperty] : value, [this.textProperty] : text }) => this._getOption(value, text)) 
}
            </select>
        `;
    }
}

customElements.define('delavega-dropdown', DropDown);
