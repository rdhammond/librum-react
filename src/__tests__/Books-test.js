import React from 'react';
import { shallow } from 'enzyme';
import Books from '../Books';
import moxios from 'moxios';

import './moxios-extensions');

const testBooks = [
	{title: 'ABC', author: 'XYZ', estValue: 1},
	{title: 'BCD', author: 'WXY', estValue: 2},
	{title: 'CDE', author: 'VWX', estValue: 3}
];

beforeEach(() => {
	moxios.install();
});

afterEach(() => {
	moxios.uninstall();
});

test('Shows "no results" message if no books', () => {
	const books = shallow(<
});

test('Maps proper number of books[]', () => {
});

test('Sets notes on detail change', () => {
});

test('Sets alert if error during detail change', () => {
});
