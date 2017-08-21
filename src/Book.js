import React, { Component } from 'react';

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

export default Book;
