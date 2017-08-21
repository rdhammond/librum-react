import axios from 'axios';

class LibrumApi {
	constructor(baseURL) {
		// Trying to set baseURL as a default will screw with
		// automated tests.
		this.baseURL = baseURL;
	}

	async callAxios(cb) {
		try {
			return (await cb()).data;
		}
		catch(e) {
			return e.response.data || {code: 'IntervalServerError'};
		}
	}

	sendCoverTo(url, cover, method) {
		const formData = new FormData();
		formData.append('cover', cover);

		return axios.post(url, formData, {
			method,
			headers: { 'Content-Type': 'multipart/form-data' },
			baseURL: this.baseURL
		});
	}

	previewCover(cover) {
		return this.callAxios(() => this.sendCoverTo('covers/preview', cover, 'POST'));
	}

	postBook(data) {
		return this.callAxios(() => axios.post('books', data, {baseURL: this.baseURL}));
	}

	setCover(bookId, cover) {
		return this.callAxios(() => this.sendCoverTo('covers/' + bookId, cover, 'PATCH'));
	}

	search(opts) {
		const params = {};
		if (opts) {
			if (opts.query)
				params.q = opts.query;

			const pn = parseInt(opts.pageNum, 10);
			if (pn >= 1)
				params.pn = pn;
		}

		return this.callAxios(() => axios.get('books', params, {baseURL: this.baseURL}));
	}
}

export default LibrumApi;
