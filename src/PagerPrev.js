import React, { Component } from 'react';

class PagerPrev extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.page - 1);
	}

	render() {
		if (this.props.page > 0) {
			return (
				<li>
					<a className="prev" href="#" aria-label="Previous" onClick={this.handleClick}>
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
			);
		}

		return (
			<li className="disabled">
				<span aria-hidden="true">&laquo;</span>
			</li>
		);
	}
}

export default PagerPrev;
