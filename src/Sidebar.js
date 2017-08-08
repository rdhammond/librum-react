import React, { Component } from 'react';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.handleBooksClicked = this.handleBooksClicked.bind(this);
		this.handleAddBookClicked = this.handleAddBookClicked.bind(this);
	}

	handleBooksClicked() {
		this.props.handleContentIdChange('books');
	}

	handleAddBookClicked() {
		this.props.handleContentIdChange('add-book');
	}

	render() {
		const contentId = this.props.contentId;
		const booksTabClass = 'books-tab'
			+ (contentId==='books' ? ' active' : '');
		const addBookTabClass = 'add-book-tab'
			+ (contentId==='add-book' ? ' active' : '');

		return (
			<ul className="nav nav-sidebar">
				<li className={booksTabClass}>
					<a href="#" onClick={this.handleBooksClicked}>
						Books
						{contentId==='books' && <span className="sr-only">(current)</span>}
					</a>
				</li>
				<li className={addBookTabClass}>
					<a href="#" onClick={this.handleAddBookClicked}>
						Add Book
						{contentId==='add-book' && <span className="sr-only">(current)</span>}
					</a>
				</li>
			</ul>
		);
	}
}

export default Sidebar;
