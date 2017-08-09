import React from 'react';
import { shallow } from 'enzyme';
import AddBook from '../AddBook';
import LibrumApi from '../LibrumApi';

function setTestState(ctrl) {
	ctrl.setState({
		title: 'Test',
		author: 'Test2',
		estValue: 1
	});
}

test('Sets error if error returned', () => {
	console.log(LibrumApi);
	LibrumApi.mockImplementationOnce(() => {
		return {
			postBook: jest.fn(() => Promise.resolve({error: 'XYZ'}))
		};
	});

	const addBook = shallow(<AddBook />);
	setTestState(addBook);
	addBook.find('#frmAddBook').simulate('submit');
	expect(addBook.state.alertHeader).toBeTruthy();
	expect(addBook.state.alertMsg).toBeTruthy();
	expect(addBook.state.alertType).not.toBe('success');
});

test('Sets error if promise rejected', () => {
	LibrumApi.mockImplementationOnce(() => {
		return {
			postBook: jest.fn(() => Promise.resolve({}))
		};
	});

	const addBook = shallow(<AddBook />);
	setTestState(addBook);
	addBook.find('#frmAddBook').simulate('submit');
	expect(addBook.state.alertHeader).toBeTruthy();
	expect(addBook.state.alertMsg).toBeTruthy();
	expect(addBook.state.alertType).not.toBe('success');
});

test('Patches in cover data after post', () => {
	LibrumApi.mockImplementationOnce(() => {
		return {
			postBook: jest.fn(() => Promise.resolve({})),
			setCover: jest.fn(() => Promise.resolve({}))
		};
	});

	const addBook = shallow(<AddBook />);
	setTestState(addBook);
	addBook.setState({cover: {}});
	addBook.find('#frmAddBook').simulate('submit');
	expect(addBook.state.alertHeader).toBeTruthy();
	expect(addBook.state.alertMsg).toBeTruthy();
	expect(addBook.state.alertType).toBe('success');
});

test('Sets error if patch fails', () => {
	LibrumApi.mockImplementationOnce(() => {
		return {
			postBook: jest.fn(() => Promise.resolve({})),
			setCover: jest.fn(() => Promise.resolve({error: 'test'}))
		};
	});

	const addBook = shallow(<AddBook />);
	setTestState(addBook);
	addBook.setState({cover: {}});
	addBook.find('#frmAddBook').simulate('submit');
	expect(addBook.state.alertHeader).toBeTruthy();
	expect(addBook.state.alertMsg).toBeTruthy();
	expect(addBook.state.alertType).not.toBe('success');
});

test('Sets error if patch rejects', () => {
	LibrumApi.mockImplementationOnce(() => {
		return {
			postBook: jest.fn(() => Promise.resolve({})),
			setCover: jest.fn(() => Promise.reject('Test'))
		};
	});

	const addBook = shallow(<AddBook />);
	setTestState(addBook);
	addBook.setState({cover: {}});
	addBook.find('#frmAddBook').simulate('submit');
	expect(addBook.state.alertHeader).toBeTruthy();
	expect(addBook.state.alertMsg).toBeTruthy();
	expect(addBook.state.alertType).not.toBe('success');
});

test('Resets state after post/patch succeeds', () => {
	LibrumApi.mockImplementationOnce(() => {
		return {
			postBook: jest.fn(() => Promise.resolve({})),
			setCover: jest.fn(() => Promise.resolve({}))
		};
	});

	const addBook = shallow(<AddBook />);
	setTestState(addBook);
	addBook.setState({cover: {}});
	addBook.find('#frmAddBook').simulate('submit');
	expect(addBook.state.title).toBeFalsy();
});

test('Resets state after post fails', () => {
	LibrumApi.mockImplementationOnce(() => {
		return {
			postBook: jest.fn(() => Promise.resolve({error: 'Test'}))
		};
	});

	const addBook = shallow(<AddBook />);
	setTestState(addBook);
	addBook.find('#frmAddBook').simulate('submit');
	expect(addBook.state.title).toBeFalsy();
});

test('Resets state after patch fails', () => {
	LibrumApi.mockImplementationOnce(() => {
		return {
			postBook: jest.fn(() => Promise.resolve({})),
			setCover: jest.fn(() => Promise.resolve({error: 'ABC'}))
		};
	});

	const addBook = shallow(<AddBook />);
	setTestState(addBook);
	addBook.setState({cover: {}});
	addBook.find('#frmAddBook').simulate('submit');
	expect(addBook.state.title).toBeFalsy();
});

test('Sets new coverUrl if preview succeeds', () => {
	function PhotoUpload() {
		return (<input type="file" onChange={onChanged} />);
	}

	LibrumApi.mockImplementationOnce(() => {
		return {
			previewCover: jest.fn(() => Promise.resolve({base64uri: 'test'}))
		};
	});

	const addBook = shallow(<AddBook />);
	addBook.find(PhotoUpload).render().simulate('change');
	expect(addBook.state.coverUrl).toBe('test');
});

test('Sets error if preview fails', () => {
	function PhotoUpload() {
		return (<input type="file" onChange={onChanged} />);
	}

	LibrumApi.mockImplementationOnce(() => {
		return {
			previewCover: jest.fn(() => Promise.resolve({error: 'XYZ'}))
		};
	});

	const addBook = shallow(<AddBook />);
	addBook.find(PhotoUpload).render().simulate('change');
	expect(addBook.state.alertHeader).toBeTruthy();
	expect(addBook.state.alertMsg).toBeTruthy();
	expect(addBook.state.alertType).not.toBe('success');
});
