import React from 'react';
import {shallow} from 'enzyme';
import PagerPrev from '../PagerPrev';

test('Renders when disabled', () => {
	const prev = shallow(<PagerPrev page={0} />);
	expect(prev.find('li').hasClass('disabled')).toBeTruthy();
	expect(prev.find('a').length).toBe(0);
});

test('Renders when enabled', () => {
	const prev = shallow(<PagerPrev page={1} />);
	expect(prev.find('li').hasClass('disabled')).toBeFalsy();
	expect(prev.find('a').hasClass('prev')).toBeTruthy();
});

test('Handles callback on enabled', (done) => {
	function callback(pageNum) {
		expect(pageNum).toBe(0);
		done();
	}

	const prev = shallow(<PagerPrev page={1} onClick={callback} />);
	prev.find('.prev').simulate('click');
});
