import React from 'react';
import { shallow } from 'enzyme';
import AddBook from '../AddBook';
import LibrumApi from '../LibrumApi';
import moxios from 'moxios';

import './moxios-extensions';

const testState = {
	title: 'XYZ',
	author: '123',
	year: 1902,
	era: 'BCE',
	estValue: 1
};

beforeEach(() => {
	moxios.install();
});

afterEach(() => {
	moxios.uninstall();
});

function expectAlert(add, type) {
	const state = add.state();
	expect(state.alertHeader).toBeTruthy();
	expect(state.alertMsg).toBeTruthy();
	expect(state.alertType).toBe(type);
}

function expectReset(add) {
	for (let key of ['title', 'author', 'year', 'era', 'publisher', 'era']) {
		expect(add.find('#' + key).prop('value')).toBeFalsy();
	}
	expect(add.state().cover).toBeFalsy();
}

test('Upload cover set alerts on error', async () => {
	const add = shallow(<AddBook dataUrl='/' />);
	moxios.respondErr();
	await add.instance().handleCoverChanged({});
	expectAlert(add, 'danger');
});

test('Upload cover clears cover on error', async () => {
	const add = shallow(<AddBook dataUrl='/' />);
	add.setState({cover: {}});
	moxios.respondErr();
	await add.instance().handleCoverChanged({});
	expect(add.state().cover).toBeFalsy();
});

test('Upload cover sets new cover on success', async () => {
	const cover = {};
	const add = shallow(<AddBook dataUrl='/' />);
	moxios.respond({base64uri: 'XXX'});
	await add.instance().handleCoverChanged(cover);
	expect(add.state().cover).toBe(cover);
});

test('Upload cover sets thumbnail uri on success', async () => {
	const add = shallow(<AddBook dataUrl='/' />);
	moxios.respond({base64uri: 'XXX'});
	await add.instance().handleCoverChanged({});
	expect(add.state().thumbnailUrl).toBe('XXX');
});

test('Sets success if post works', async () => {
	const add = shallow(<AddBook dataUrl='/' />);
	moxios.respond({id:1});
	await add.instance().handleSubmit();
	expectAlert(add, 'success');
});

test('Resets state if error returned on book post', async () => {
	const add = shallow(<AddBook dataUrl='/' />);
	add.setState(testState);
	moxios.respond({id:1});
	await add.instance().handleSubmit();
	expectReset(add);
});

test('Sets error if error returned on book post', async () => {
	const add = shallow(<AddBook dataUrl='/' />);
	moxios.respondErr();
	await add.instance().handleSubmit();
	expectAlert(add, 'danger');
});

test('Resets state if error returned on book post', async () => {
	const add = shallow(<AddBook dataUrl='/' />);
	add.setState(testState);
	moxios.respondErr();
	await add.instance().handleSubmit();
	expectReset(add);
});
