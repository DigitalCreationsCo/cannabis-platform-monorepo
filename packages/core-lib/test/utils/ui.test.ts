import { buildSTFormFields, renderAddress, renderNestedDataObject } from '../../src/utils/ui';

const address = {
    street1: '123 Main St',
    street2: 'Apt 1',
    city: 'Denver',
    state: 'CO',
    country: 'USA',
    zipcode: '80202'
}

describe('renderAddress', () => {
    test(' displays a correct address', () => {
        expect(renderAddress({ address })).toEqual('123 Main St Apt 1 Denver, CO USA 80202')
    });

    test(' displays a correct address - no show zipcode', () => {
        expect(renderAddress({ address, showZipcode: false })).toEqual('123 Main St Apt 1 Denver, CO USA')
    });

    test(' displays a correct address - no show country', () => {
        expect(renderAddress({ address, showCountry: false })).toEqual('123 Main St Apt 1 Denver, CO 80202')
    });

    test(' displays a correct address - no show state', () => {
        expect(renderAddress({ address, showState: false })).toEqual('123 Main St Apt 1 Denver, USA 80202')
    });

    test(' displays a correct address - no show city', () => {
        expect(renderAddress({ address, showCity: false })).toEqual('123 Main St Apt 1 CO USA 80202')
    });
})

describe('renderNestedDataObject ', () => {
    test(' displays a correct nested object with remove fields', () => {
        const data = {
            name: 'John Doe',
            age: 25,
            address: {
                street1: '123 Main St',
                street2: 'Apt 1',
                city: 'Denver',
                state: 'CO',
                country: 'USA',
                zipcode: '80202'
            }
        }
        const Component = (props: any) => props.children;
        const removeFields = ['age'];
        const result = [
            'name: John Doe',
            'address: 123 Main St Apt 1 Denver, CO USA 80202'
        ]
        expect(renderNestedDataObject(data, Component, removeFields)).toEqual(result);
    });

    test(' displays a correct nested object without remove fields', () => {
        const data = {
            name: 'John Doe',
            age: 25,
            address: {
                street1: '123 Main St',
                street2: 'Apt 1',
                city: 'Denver',
                state: 'CO',
                country: 'USA',
                zipcode: '80202'
            }
        }
        const Component = (props: any) => props.children;
        const result = [
            'name: John Doe',
            'age: 25',
            'address: 123 Main St Apt 1 Denver, CO USA 80202'
        ]
        expect(renderNestedDataObject(data, Component)).toEqual(result);
    });
});

describe('buildSTFormFields', () => {
    test(' displays a correct nested object with remove fields', () => {
        const data = {
            name: 'John Doe',
            age: 25,
            address: {
                street1: '123 Main St',
                street2: 'Apt 1',
                city: 'Denver',
                state: 'CO',
                country: 'USA',
                zipcode: '80202'
            }
        }
        const result = [
            { id: 'name', value: 'John Doe' },
            { id: 'age', value: 25 },
            {
                id: 'address', value: [
                    { id: 'street1', value: '123 Main St' },
                    { id: 'street2', value: 'Apt 1' },
                    { id: 'city', value: 'Denver' },
                    { id: 'state', value: 'CO' },
                    { id: 'country', value: 'USA' },
                    { id: 'zipcode', value: '80202' }
                ]
            }
        ]
        expect(buildSTFormFields(data)).toEqual(result);
    });
});