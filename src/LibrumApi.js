import axios from 'axios';

class LibrumApi {
	constructor(baseURL) {
		// Trying to set baseURL as a default will screw with
		// unit tests.
		this.baseURL = baseURL;
	}

	unpackResult(response) {
		// This unwinds any axios error responses.
		//
		if (response.response)
			response = response.response;

		const data = response.data || {};
		if (response.status != 200 && !data.error)
			data.error = response.status + ' error';

		return data.error
			? Promise.reject(data)
			: Promise.resolve(data);
	}

	sendCoverTo(cover, url, method) {
		const formData = new FormData();
		formData.append('cover', cover);

		return axios.post(url, formData, {
			method,
			headers: { 'Content-Type': 'multipart/form-data' },
			baseURL: this.baseURL
		});
	}

	previewCover(cover) {
		return this.sendCoverTo(cover, 'covers/preview', 'POST')
		.then(res => this.unpackResult(res))
		.catch(error => this.unpackResult(error));
	}

	postBook(data) {
		return axios.post('books', data, {baseURL: this.baseURL})
		.then(res => this.unpackResult(res))
		.catch(error => this.unpackResult(error));
	}

	setCover(bookId, cover) {
		return this.sendCoverTo(cover, 'covers/' + bookId, 'PATCH')
		.then(res => this.unpackResult(res))
		.catch(error => this.unpackResult(error));
	}
}

export default LibrumApi;
