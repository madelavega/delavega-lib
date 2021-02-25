import { fixture, html, expect } from '@open-wc/testing';
// Very important to ensure any elements we test are loaded
import Table from '../../../components/table/Table';
import TableColumn from '../../../components/table/column';

describe('delavega-table', () => {
    const data = [
        {
            'tier' : 'I',
            'match': '5 numbers + 2 euronumbers',
        },
        {
            'tier' : 'II',
            'match': '5 numbers + 1 euronumbers',
        }];

    let table;
    beforeEach(async () => {
        table = await fixture(html`<delavega-table></delavega-table>`);
        table.data = data;
        await table.updateComplete;
    });

    it('<delavega-table> is an instance of Table', async () => {
        const element = document.createElement('delavega-table');
        assert.instanceOf(element, Table);
    });


    it('<delavega-table> has <delavega-table-column>', async () => {
        const tableColumns = table.shadowRoot.querySelectorAll('delavega-table-column');

        for (const tableColumn of tableColumns) {
            assert.instanceOf(tableColumn, TableColumn);
        }
    });

    it('renders as table', async () => {
        const htmlTable = table.shadowRoot.querySelector('table');
        // eslint-disable-next-line no-undef
        assert.instanceOf(htmlTable, HTMLTableElement);
    });

    it('has 2 records and the header row (3 rows)', async () => {
        const rows = table.shadowRoot.querySelectorAll('tr');
        assert.lengthOf(rows, 3);
    });

    it('has a spinner until data is loaded', async () => {
        table.data = [];
        table.loading = true;
        await table.updateComplete;

        let htmlTable = table.shadowRoot.querySelector('table');
        expect(htmlTable, 'Table must be null').to.be.null;

        let loading = table.shadowRoot.querySelector('span.loader');
        expect(loading, 'Loader start').to.not.be.null;

        table.data = data;
        await table.updateComplete;

        htmlTable = table.shadowRoot.querySelector('table');
        expect(htmlTable, 'data loaded, but loader is still working').to.be.null;

        table.loading=false;
        await table.updateComplete;

        htmlTable = table.shadowRoot.querySelector('table');
        expect(htmlTable, 'loader is false, so table is visible now').to.not.be.null;
        loading = table.shadowRoot.querySelector('span.loader');
        expect(loading, 'loader is false, so its removed from dom').to.be.null;
    });

    it('paints headers tr and one tr for record data)', async () => {
        const record = data[0],
            oneData = [record],
            keys = Object.keys(record);

        table.data = oneData;
        await table.updateComplete;

        const body = table.shadowRoot.querySelector('tbody'),
            recordValues = body.querySelectorAll('tr td'),
            values = keys.map(k => record[k]),
            head = table.shadowRoot.querySelector('thead'),
            headers = head.querySelectorAll('tr td');

        for (const header of headers) {
            expect(keys.includes(header.innerText, 'All headers are correct')).to.be.true;
        }
        for (const recordValue of recordValues) {
            expect(values.includes(recordValue.innerText, 'All values are correct')).to.be.true;
        }
    });

});