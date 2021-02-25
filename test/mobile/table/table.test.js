import { fixture, html, expect } from '@open-wc/testing';
// Very important to ensure any elements we test are loaded
import Table from '../../../components/table/Table';
import TableColumn from '../../../components/table/column';
import { isMobileDevice } from '../../../components/utils/media';

describe('delavega-table for mobile devices', () => {
    if(isMobileDevice()) {
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

        it('renders as divs', async () => {
            const card = table.shadowRoot.querySelector('div');
            // eslint-disable-next-line no-undef
            assert.instanceOf(card, HTMLDivElement);
        });

        it('has 2 records', async () => {
            const rows = table.shadowRoot.querySelectorAll('div.card');
            assert.lengthOf(rows, 2);
        });


        it('has a spinner until data is loaded', async () => {
            table.data = [];
            table.loading = true;
            await table.updateComplete;

            let htmlTable = table.shadowRoot.querySelector('div.cards');
            expect(htmlTable, 'Table must be null').to.be.null;

            let loading = table.shadowRoot.querySelector('span.loader');
            expect(loading, 'Loader start').to.not.be.null;

            table.data = data;
            await table.updateComplete;

            htmlTable = table.shadowRoot.querySelector('div.cards');
            expect(htmlTable, 'data loaded, but loader is still working').to.be.null;

            table.loading=false;
            await table.updateComplete;

            htmlTable = table.shadowRoot.querySelector('div.cards');
            expect(htmlTable, 'loader is false, so table is visible now').to.not.be.null;
            loading = table.shadowRoot.querySelector('span.loader');
            expect(loading, 'loader is false, so its removed from dom').to.be.null;
        });

        it('paints data and headers for each card section (headers and values)', async () => {
            const record = data[0],
                oneData = [record],
                keys = Object.keys(record);

            table.data = oneData;
            await table.updateComplete;

            const htmlValuesWrapper = table.shadowRoot.querySelector('div.cards div.card div.values'),
                htmlValues = htmlValuesWrapper.querySelectorAll('.value'),
                values = keys.map(k => record[k]),
                htmlHeadersWrapper = table.shadowRoot.querySelector('div.cards div.card div.headers'),
                htmlHeaders = htmlHeadersWrapper.querySelectorAll('.header');

            for (const htmlHeader of htmlHeaders) {
                expect(keys.includes(htmlHeader.innerText, 'All headers are correct')).to.be.true;
            }

            for (const htmlValue of htmlValues) {
                expect(values.includes(htmlValue.innerText, 'All values are correct')).to.be.true;
            }


        });
    }
});