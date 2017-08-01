import React, { Component } from 'react';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.handleBooksClicked = this.handleBooksClicked.bind(this);
		this.handleAddBookClicked = this.handleAddBookClicked.bind(this);
	}

	handleBooksClicked(e) {
		this.props.handleContentIdChange('books');
	]

	handleAddBookClicked(e) {
		this.props.handleContentIdChange('add-book');
	}

	render() {
		const contentId = this.props.contentId;

		return (
			<ul class="nav nav-sidebar">
				<li class={contentId==='books' ? 'active' : ''}>
					<a href="#" onClick={this.handleBooksClicked}>
						Books
						{contentId==='books' && <span class="sr-only">(current)</span>}
					</a>
				</li>
				<li class={contentId==='add-book' ? 'active', ''}>
					<a href="#" onClick={this.handleAddBookClicked}>
						Add Book
						{contentId==='add-book' && <span class="sr-only">(current)</span>}
					</a>
				</li>
			</ul>
		);
	}
}

export default Sidebar;
