import React, { Component } from 'react';

class PrevPage extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.page - 1);
	}

	render() {
		if (this.props.disabled)
			return (
				<li className="disabled">
					<span aria-hidden="true">&laquo;</span>
				</li>
			);

		return (
			<li>
				<a className="prev" href="#" aria-label="Previous" onClick={this.handeClick}>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
		);
	}
}

class Page extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.num);
	}

	render() {
		const num = this.props.num;
		const active = this.props.active;

		return (
			<li className={active ? 'active' : ''}>
				<a className="page" href="#" onClick={this.handleClick}>{num+1}</a>
				{active && <span className="sr-only">(current)</span>}
			</li>
		);
	}
}

class NextPage extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.page + 1);
	}

	render() {
		if (this.props.disabled)
			return (
				<li className="disabled">
					<span aria-hidden="true">&raquo;</span>
				</li>
			);

		return (
			<li>
				<a className="next" href="#" aria-label="Next" onClick={this.handleClick}>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		);
	}
}

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
			pages.push(<Page num={i} active={i===page} onClick={this.handlePageChange} />);
		}

		return (
			<nav className="text-center" aria-label="Page navigation">
				<ul className="pagination">
					<PrevPage page={page} disabled={page < 1} />
					{pages}
					<NextPage page={page} disabled={page >= (maxPages - 1)} />
				</ul>
			</nav>
			{(isBottom && page >= maxPages) &&
			<h2 className="text-center text-muted">Didn't find what you're looking for?</h2>
			<p className="text-center text-muted">Try narrowing your search to specific authors or years.</p>
			}
		);
	}
}
