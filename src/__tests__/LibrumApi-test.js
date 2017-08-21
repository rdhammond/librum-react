import LibrumApi from '../LibrumApi';
import moxios from 'moxios';

import './moxios-extensions';

var api;

beforeEach(() => {
	moxios.install();
	api = new LibrumApi('/');
});

afterEach(() => {
	moxios.uninstall();
});

test('previewCover works', () => {
	const promise = api.previewCover({})
	.then(data => {
		expect(data).toBeTruthy();
		expect(data.base64uri).toBe('XYZ');
	});

	moxios.respond({base64uri: 'XYZ'});
	return promise;
});

test('previewCover handles error', () => {
	const promise = api.previewCover({}).thenExpectErr();
	moxios.respondErr();
	return promise;
});

test('postBook works', () => {
	const promise = api.postBook({})
	.then(data => {
		expect(data).toBeTruthy();
		expect(data.id).toBe(1);
	});

	moxios.respond({id: 1});
	return promise;
});

test('postBook handles error', () => {
	const promise = api.postBook({}).thenExpectErr();
	moxios.respondErr();
	return promise;
});

test('setCover works', () => {
	const promise = api.setCover(1, {})
	.then(data => {
		expect(data).toBeFalsy();
	});

	moxios.respond('');
	return promise;
});

test('setCover handles error', () => {
	const promise = api.setCover(1, {}).thenExpectErr();
	moxios.respondErr();
	return promise;
});
