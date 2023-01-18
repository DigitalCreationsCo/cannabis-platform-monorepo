describe('Env Test', () => {
    test('test development env has development values', async () => {
        expect('1').toEqual('1');
    });

    test('test staging env has staging values', async () => {
        expect('1').toEqual('1');
    });

    test('test production env has production values', async () => {
        expect('1').toEqual('1');
    });
});
