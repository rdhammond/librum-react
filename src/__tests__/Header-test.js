import React from 'react';
import {shallow} from 'enzyme';
import Header from '../Header';

test('It should render without filter', () => {
	const header = shallow(
		<Header />
	);
	expect(header.hasClass('navbar')).toBe(true);
});

test('It should propigate filter', () => {
	const header = shallow(
		<Header filter="Test" />
	);
	expect(header.find('.filter').props().defaultValue).toBe('Test');
});

test('It should push filter up on change', () => {
	let val = "Test";

	const testChange = (newVal) => {
		val = newVal;
	};

	const header = shallow(
		<Header filter={val} onFilterChange={testChange} />
	);

	header.find('form').simulate('submit', {target:{value:'Test2'}});
	expect(val).toBe('Test2');
});
