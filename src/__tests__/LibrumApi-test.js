import LibrumApi from '../LibrumApi';
import moxios from 'moxios';

var api;

beforeEach(() => {
	moxios.install();
	
	// Value doesn't matter, just here to make LibrumApi feel better
	// about itself.
	api = new LibrumApi('http://localhost:3000/');
});

afterEach(() => {
	moxios.uninstall();
});

test('unpackResult() should unpack data', () => {
	const data = {a:1};
	expect(api.unpackResult({status: 200, data})).resolves.toMatchObject(data);
});

test('unpackResult() should set error on non-200 if none given', () => {
	expect(api.unpackResult({status: 404, data: {}}))
	.resolves.toHaveProperty('error');
});
