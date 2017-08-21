import moxios from 'moxios';

Promise.prototype.thenExpectErr = function() {
	return this.then(data => {
		expect(data).toBeTruthy();
		expect(data.code).toBeTruthy();
	});
};

moxios.respond = response => {
	moxios.wait(() => {
		moxios.requests.mostRecent()
		.respondWith({ status: 200, response });
	});
};

moxios.respondErr = () => {
	moxios.wait(() => {
		moxios.requests.mostRecent()
		.respondWith({
			status: 404,
			response: {code: 'ResourceNotFound'}
		});
	});
};
