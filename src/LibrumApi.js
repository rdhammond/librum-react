import axios from 'axios';

class LibrumApi {
	constructor(baseURL) {
		this.axios = axios.create({baseURL});
	}

	unpackResult(response) {
		if (response.status != 200 && !response.data.error)
			response.data.error = response.status + ' response';

		return Promise.resolve(response.data);
	}

	sendCoverTo(cover, url, method) {
		const formData = new FormData();
		formData.append('cover', cover);

		return this.axios.post(url, data, {
			method: method || 'POST',
			headers: { 'Content-Type': 'multipart/form-data' }
		});
	}

	previewCover(cover) {
		return sendCoverTo(cover, 'covers/preview')
		.then(unpackResult);
	}

	postBook(data) {
		return this.axios.post('books', data)
		.then(unpackResult);
	}

	setCover(bookId, cover) {
		return sendCoverTo(cover, 'covers/' + bookId, 'PATCH')
		.then(unpackResult);
	}
}

export default LibrumApi;
