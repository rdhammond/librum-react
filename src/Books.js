import React, { Component } from 'react';
import Pager from './Pager';
import BookDetails from './BookDetails';
import Alert from './Alert';

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
				<td className="cover">
					<img src={this.thumbnailUrl(book)} aria-hidden="true" />
				</td>
				<td className="title">{book.title}</td>
				<td className="author">{book.author}</td>
				<td className="year">{this.yearStr(book)}</td>
				<td className="estValue">{book.estValue}</td>
			</tr>
		);
	}
}

class Books extends Component {
	constructor(props) {
		this.state = {
			books: [],
			page: 0,
			pageSize: 15,
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

		this.api = new LibrumApi(this.props.dataUrl);
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

	async handleDetailsChanged(book, notes) {
		const books = this.state.books;
		book.notes = notes;

		const data = await this.api.postBook(url, data);
		if (data.code) {
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

		return (
			<h1>Books</h1>
			<Alert header={alertHeader} msg={alertMsg} type="danger" />
			{books.length < 1 &&
			<h2 className="text-center text-muted">No results found.</h2>
			}
			{books.length >= 1 &&
			<Pager page={page} maxPages={maxPages} onPageChanged={this.handlePageChanged} />
			<table className="books table table-striped table-hover">
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

export default Book;
