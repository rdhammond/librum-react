import React from 'react';
import {shallow} from 'enzyme';
import PagerNext from '../PagerNext';

test('Renders properly when disabled', () => {
	const next = shallow(<PagerNext page={0} maxPages={2} />);
	expect(next.find('li').hasClass('disabled')).toBeFalsy();
	expect(next.find('a').hasClass('next')).toBeTruthy();
});

test('Renders property when enabled', () => {
	const next = shallow(<PagerNext page={0} maxPages={1} />);
	expect(next.find('li').hasClass('disabled')).toBeTruthy();
	expect(next.find('a').length).toBe(0);
});

test('Calls click handler when enabled and clicked', (done) => {
	function callback(pageNum) {
		expect(pageNum).toBe(1);
		done();
	}

	const next = shallow(<PagerNext page={0} maxPages={2} onClick={callback} />);
	next.find('.next').simulate('click');
});
