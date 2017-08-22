import React, { Component } from 'react';
import PagerPrev from './PagerPrev';
import PagerNum from './PagerNum';
import PagerNext from './PagerNext';

class Pager extends Component {
	constructor(props) {
		super(props);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handlePageChange(page) {
		this.props.onPageChange(page);
	}

	render() {
		const maxPages = this.props.maxPages;
		if (maxPages < 2)
			return null;

		const page = this.props.page;
		const isBottom = this.props.isBottom;
		const startPage = Math.max(0, page - 2);
		const endPage = Math.min(maxPages - 1, page + 2);

		let pages = [];
		for (let i=startPage; i<=endPage; i++) {
			pages.push(<PagerNum num={i} active={i===page} onClick={this.handlePageChange} />);
		}

		return (
			<nav className="text-center" aria-label="Page navigation">
				<ul className="pagination">
					<PagerPrev page={page} disabled={page < 1} />
					{pages}
					<PagerNext page={page} disabled={page >= (maxPages - 1)} />
				</ul>
			</nav>
			{(isBottom && page >= maxPages) &&
			<h2 className="text-center text-muted">Didn't find what you're looking for?</h2>
			<p className="text-center text-muted">Try narrowing your search to specific authors or years.</p>
			}
		);
	}
}

default export Pager;
