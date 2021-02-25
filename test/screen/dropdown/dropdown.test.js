import { fixture, html, expect } from '@open-wc/testing';
// Very important to ensure any elements we test are loaded
import DropDown from '../../../components/dropdown/index';

describe('delavega-dropdown', () => {

    it('<delavega-dropdown> is an instance of DropDown', async () => {
        const element = document.createElement('delavega-dropdown');
        assert.instanceOf(element, DropDown);
    });

    it('has not a property default-empty-value', async () => {
        const el = await fixture(html`<delavega-dropdown></delavega-dropdown>`);
        expect(el.defaultEmptyValue).to.be.false;

        const option = el.shadowRoot.querySelector('option');
        expect(option).to.be.null;
    });

    it('has a property default-empty-value', async () => {
        const el = await fixture(html`<delavega-dropdown defaultEmptyValueText="none" default-empty-value="true"></delavega-dropdown>`);
        expect(el.defaultEmptyValue).to.be.true;

        const option = el.shadowRoot.querySelector('option');
        assert.equal(option.getAttribute('value'), '');
        assert.equal(option.innerText, 'none');
    });

    it('has two values without empty value', async () => {
        const el = await fixture(html`<delavega-dropdown></delavega-dropdown>`);
        el.data = [{ text: 'text 1', value: 1 }, { text: 'text 2', value: 2 }];
        await el.updateComplete;
        const options = el.shadowRoot.querySelectorAll('option');
        assert.lengthOf(options, 2, 'Two options in the dropdown');
    });


    it('has two values with empty value', async () => {
        const el = await fixture(html`<delavega-dropdown default-empty-value="true"></delavega-dropdown>`);
        el.data = [{ text: 'text 1', value: 1 }, { text: 'text 2', value: 2 }];
        await el.updateComplete;
        const options = el.shadowRoot.querySelectorAll('option');
        assert.lengthOf(options, 3, 'Two options in the dropdown and an empty value');
    });

    it('changes default text and value properties', async () => {
        const el = await fixture(html`<delavega-dropdown></delavega-dropdown>`);
        el.data = [{ t: 'text 1', v: 1 }];
        el.valueProperty = 'v';
        el.textProperty = 't';
        await el.updateComplete;
        const option = el.shadowRoot.querySelector('option');
        assert.equal(option.value, 1);
        assert.equal(option.innerText, 'text 1');
    });
});