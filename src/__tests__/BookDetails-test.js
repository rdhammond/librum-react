import React from 'react';
import {shallow, mount} from 'enzyme';
import BookDetails from '../BookDetails';
import $ from 'jquery';

const testBook = {
	_id: '4',
	title: 'XYZ',
	author: 'ABC',
	estValue: 1,
	notes: 'Test'
};

test('Sets cover url when book passed in', () => {
	const details = shallow(<BookDetails dataUrl='/' book={testBook} />);
	expect(details.find('.img-thumbnail').prop('src'))
		.toBe('/cover/4');
});

test('Populates notes when book passed in', () => {
	const details = shallow(<BookDetails dataUrl='/' book={testBook} />);
	expect(details.find('#notes').prop('value'))
		.toBe('Test');
});

test('Sets year properly when BCE specified', () => {
	const book = {
		year: 2000,
		era: 'BCE'
	};
	const details = shallow(<BookDetails dataUrl='/' book={book} />);
	expect(details.find('#year').text()).toBe('2000 BCE');
});

test('Sets year properly when BCE not specified', () => {
	const book = {
		year: 2000,
		era: 'CE'
	};
	const details = shallow(<BookDetails dataUrl='/' book={book} />);
	expect(details.find('#year').text()).toBe('2000');
});

test('Hides year when year not specified', () => {
	const details = shallow(<BookDetails dataUrl='/' book={testBook} />);
	expect(details.find('#year').text()).toBeFalsy();
});

test('Sets search by title when book passed in', () => {
	const details = shallow(<BookDetails dataUrl='/' book={testBook} />);
	expect(details.find('#google-title').prop('href'))
		.toBe('https://www.google.com?q=intext%3A%22XYZ%22');
});

test('Sets search by author when book passed in', () => {
	const details = shallow(<BookDetails dataUrl='/' book={testBook} />);
	expect(details.find('#google-author').prop('href'))
		.toBe('https://www.google.com?q=intext%3A%22ABC%22');
});

test('Bubbles up save event when close button clicked', () => {
	$.fn.dialog = function() {};

	function callback(book, notes) {
		expect(book).toBe(testBook);
		expect(notes).toBe('Test');
	}

	const details = shallow(<BookDetails dataUrl='/' book={testBook} onNotesChanged={callback} />);
	details.find('.btn-default').simulate('click');
});

test('Hides dialog after save', (done) => {
	$.fn.dialog = done;
	function callback() { }

	const details = shallow(<BookDetails dataUrl='/' book={testBook} onNotesChanged={callback} />);
	details.find('.btn-default').simulate('click');
});
