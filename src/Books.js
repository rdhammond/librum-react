import React, { Component } from 'react';
import Pager from './Pager';
import BookDetails from './BookDetails';
import Alert from './Alert';
import axios from 'axios';

export class Book extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.thumbnailUrl = this.thumbnailUrl.bind(this);
		this.yearStr = this.yearStr.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.book);
	}


	thumbnailUrl(book) {
		return this.props.dataUrl + 'covers/thumbnail/' + book._id;
	}

	yearStr(book) {
		if (!book.year)
			return '';

		return book.era !== 'CE'
			? book.year + ' ' + book.era
			: book.year;
	}

	render() {
		const book = this.props.book;

		return (
			<tr>
				<td class="cover">
					<img src={this.thumbnailUrl(book)} aria-hidden="true" />
				</td>
				<td class="title">{book.title}</td>
				<td class="author">{book.author}</td>
				<td class="year">{this.yearStr(book)}</td>
				<td class="estValue">{book.estValue}</td>
			</tr>
		);
	}
}

class Books extends Component {
	constructor(props) {
		super(props);

		this.axios = axios.create({
			baseUrl: this.props.dataUrl
		});

		this.state = {
			books: [],
			page: 0,
			pageSize: 25,
			bookDetail: null,
			alertHeader: null,
			alertMsg: null
		};
		this.handlePageChanged = this.handlePageChanged.bind(this);
		this.handleBooksChanged = this.handleBooksChanged.bind(this);
		this.handleBookDetailChanged = this.handleBookDetailChanged.bind(this);
		this.handleErrorHeaderChanged = this.handleErrorHeaderChanged.bind(this);
		this.handleErrorMsgChanged = this.handleErrorMsgChanged.bind(this);
		this.handleDetailsChanged = this.handleDetailsChanged.bind(this);
		this.handleBookSent = this.handleBookSent.bind(this);
		this.thumbnailUrl = this.thumbnailUrl.bind(this);
		this.yearStr = this.yearStr.bind(this);
	}

	handlePageChange(page) {
		this.setState({page});
	}

	handleBooksChanged(books) {
		this.setState({books});
	}

	handleBookDetailChanged(bookDetail) {
		this.setState({bookDetail});
	}

	handleErrorHeaderChanged(alertHeader) {
		this.setState({alertHeader});
	}

	handleErrorMsgChanged(alertMsg) {
		this.setState({alertMsg});
	}

	handleDetailsChanged(book, notes) {
		const books = this.state.books;
		book.notes = notes;

		this.axios.put(url, data)
		.then(result => this.handleBookSent(result));
	}

	handleBookSent(result) {
		if (result.error) {
			this.setState({
				alertHeader: 'Oh no!',
				alertMsg: 'Something went wrong and your changes weren\'t saved.'
			});
			return;
		}
		this.setState(books);
	}

	render() {
		const dataUrl = this.props.dataUrl;
		const books = this.state.books;
		const page = this.state.page;
		const pageSize = this.state.pageSize;
		const bookDetail = this.state.bookDetail;
		const alertHeader = this.state.alertHeader;
		const alertMsg = this.state.alertMsg;
		const maxPages = Math.ceil(books.length / pageSize);

		const rows = books
			.slice(page*pageSize, (page+1)*pageSize + 1)
			.map((book) =>
				<Book dataUrl={dataUrl} book={book} onClick={this.handleBookDetailChanged} />
			);

		let 

		return (
			<h1>Books</h1>
			<Alert header={alertHeader} msg={alertMsg} type="danger" />
			{books.length < 1 &&
			<h2 class="text-center text-muted">No results found.</h2>
			}
			{books.length >= 1 &&
			<Pager page={page} maxPages={maxPages} onPageChanged={this.handlePageChanged} />
			<table class="books table table-striped table-hover">
				<thead>
					<tr>
						<th>Cover</th>
						<th>Title</th>
						<th>Author</th>
						<th>Year</th>
						<th>Est. Value</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
			<Pager page={page} books={books.length} isBottom="true" onPageChanged={this.handlePageChanged} />
			<BookDetails book={bookDetail} onNotesChanged={handleNotesChanged} />
			}
		);
	}
}
