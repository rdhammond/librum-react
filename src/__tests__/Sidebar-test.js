import React from 'react';
import {shallow} from 'enzyme';
import Sidebar from '../Sidebar';

test('It should render properly when books selected', () => {
	const sidebar = shallow(
		<Sidebar contentId="books" />
	);
	expect(sidebar.hasClass('nav')).toBe(true);
	expect(sidebar.find('.books-tab').hasClass('active')).toBe(true);
	expect(sidebar.find('.add-book-tab').hasClass('active')).toBe(false);
});

test('It should render property when add-book selected', () => {
	const sidebar = shallow(
		<Sidebar contentId="add-book" />
	);
	expect(sidebar.hasClass('nav')).toBe(true);
	expect(sidebar.find('.books-tab').hasClass('active')).toBe(false);
	expect(sidebar.find('.add-book-tab').hasClass('active')).toBe(true);
});

test('It should push content change event up for books tab', () => {
	let val = 'add-book';
	const handleChange = (newVal) => { val = newVal; };

	const sidebar = shallow(
		<Sidebar contentId="add-book" handleContentIdChange={handleChange}/>
	);
	sidebar.find('.books-tab a').simulate('click');
	expect(val).toBe('books');
});

test('It should push content change event up for add-book tab', () => {
	let val = 'books';
	const handleChange = (newVal) => { val = newVal; };

	const sidebar = shallow(
		<Sidebar contentId="books" handleContentIdChange={handleChange}/>
	);
	sidebar.find('.add-book-tab a').simulate('click');
	expect(val).toBe('add-book');
});
