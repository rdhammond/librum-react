import LibrumApi from '../LibrumApi';
import moxios from 'moxios';
import axios from 'axios';

var api;

beforeEach(() => {
	moxios.install();
	api = new LibrumApi('/');
});

afterEach(() => {
	moxios.uninstall();
});

test('unpackResult amends with generic error when not given', () => {
	const promise = axios.post('/')
	.catch(res => api.unpackResult(res))
	.catch(res => {
		expect(res).toBeTruthy();
		expect(res.error).toBe('500 error');
	});

	moxios.wait(function() {
		moxios.requests.mostRecent()
		.respondWith({ status: 500 });
	});
	return promise;
});

test('previewCover returns OK when successful', () => {
	const promise = api.previewCover({})
	.then(res => {
		expect(res).toBeTruthy();
		expect(res.error).toBeFalsy();
	});

	moxios.wait(function() {
		moxios.requests.mostRecent()
		.respondWith({ status: 200 });
	});
	return promise;
});

test('previewCover returns error when failed', () => {
	const promise = api.previewCover({})
	.catch(res => {
		expect(res).toBeTruthy();
		expect(res.error).toBe('XYZ');
	});

	moxios.wait(function() {
		moxios.requests.mostRecent()
		.respondWith({ status: 500, response: {error: 'XYZ'} });
	});
	return promise;
});

test('postBook returns id when successful', () => {
	const promise = api.previewCover({})
	.then(res => {
		expect(res).toBeTruthy();
		expect(res._id).toBe(1);
	});

	moxios.wait(function() {
		moxios.requests.mostRecent()
		.respondWith({ status: 200, response: {_id: 1} });
	});
	return promise;
});

test('postBook returns error when failed', () => {
	const promise = api.postBook({})
	.catch(res => {
		expect(res).toBeTruthy();
		expect(res.error).toBe('123');
	});

	moxios.wait(function() {
		moxios.requests.mostRecent()
		.respondWith({ status: 500, response: {error: '123'} });
	});
	return promise;
});

test('setCover returns OK when successful', () => {
	const promise = api.setCover(1, {})
	.then(res => {
		expect(res).toBeTruthy();
		expect(res.error).toBeFalsy();
	});

	moxios.wait(function() {
		moxios.requests.mostRecent()
		.respondWith({ status: 200 });
	});
	return promise;
});

test('setCover returns error when failed', () => {
	const promise = api.setCover(1, {})
	.catch(res => {
		expect(res).toBeTruthy();
		expect(res.error).toBe('1bD');
	});

	moxios.wait(function() {
		moxios.requests.mostRecent()
		.respondWith({ status: 500, response: {error: '1bD'} });
	});
	return promise;
});
