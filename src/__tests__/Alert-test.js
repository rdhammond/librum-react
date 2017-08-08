import React from 'react';
import {shallow} from 'enzyme';
import Alert from '../Alert';

test('Renders alert box', () => {
	const alrt = shallow(
		<Alert header="Test" msg="Test2" />
	);
	expect(alrt.hasClass('alert')).toBe(true);
	expect(alrt.is('[role="alert"]')).toBe(true);
});

test('Message renders', () => {
	const alrt = shallow(
		<Alert header="Test" msg="Test2" />
	);
	expect(alrt.find('.alert-header').text()).toBe('Test');
	expect(alrt.find('.alert-msg').text()).toBe('Test2');
});

test('Alert doesn\'t render if no header', () => {
	const alrt = shallow(
		<Alert msg="Test" />
	);
	expect(alrt.html()).toBe(null);
});

test('Message doesn\'t render if no msg', () => {
	const alrt = shallow(
		<Alert header="Test" />
	);
	expect(alrt.html()).toBe(null);
});

test('Defaults to danger alert if not specified', () => {
	const alrt = shallow(
		<Alert msg="Test" header="Test2" />
	);
	expect(alrt.is('.alert-danger')).toBe(true);
});

test('Accepts custom alert type', () => {
	const alrt = shallow(
		<Alert msg="Test" header="Test2" type="success" />
	);
	expect(alrt.is('.alert-success')).toBe(true);
});
