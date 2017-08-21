import React from 'react';
import { shallow } from 'enzyme';
import Book from '../Book';

const testBook = {
	_id: 2,
	title: 'ABC',
	author: 'XYZ',
	year: 1499,
	era: 'BCE',
	estValue: 1,
	publisher: 'Some company',
	notes: 'jldfjklaef'
};

test('Sets thumbnail URL', () => {
	var book = shallow(<Book dataUrl='/' book={testBook} />);
	expect(book.find('.cover img').prop('src'))
		.toBe('/covers/thumbnail/2');
});

test('Sets year str for BCE', () => {
	var book = shallow(<Book dataUrl='/' book={testBook} />);
	expect(book.find('.year').text()).toBe('1499 BCE');
});

test('Sets year str for non-BCE', () => {
	const bookData = {
		year: 2000,
		era: 'CE'
	};
	var book = shallow(<Book dataUrl='/' book={bookData} />);
	expect(book.find('.year').text()).toBe('2000');
});

test('Does not set year str if no year', () => {
	const bookData = { era: 'BCE' }
	var book = shallow(<Book dataUrl='/' book={bookData} />);
	expect(book.find('.year').text()).toBeFalsy();
});

test('fires OnClick handler when row clicked', (done) => {
	function callback(book) {
		expect(book).toBe(testBook);
		done();
	}

	var book = shallow(<Book dataUrl='/' book={testBook} onClick={callback} />);
	book.find('tr').simulate('click');
});
