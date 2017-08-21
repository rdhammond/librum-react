import axios from 'axios';

class LibrumApi {
	constructor(baseURL) {
		// Trying to set baseURL as a default will screw with
		// automated tests.
		this.baseURL = baseURL;
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

	async previewCover(cover) {
		try {
			const resp = await this.sendCoverTo('covers/preview', cover, 'POST');
			return resp.data;
		}
		catch(e) {
			return e.response.data;
		}
	}

	async postBook(data) {
		try {
			const resp = await axios.post('books', data, {baseURL: this.baseURL});
			return resp.data;
		}
		catch(e) {
			return e.response.data;
		}
	}

	async setCover(bookId, cover) {
		try {
			const resp = await this.sendCoverTo('covers/' + bookId, cover, 'PATCH');
			return resp.data;
		}
		catch(e) {
			return e.response.data;
		}
	}
}

export default LibrumApi;
