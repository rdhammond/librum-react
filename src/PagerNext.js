import React, { Component } from 'react';

class PagerNext extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.page + 1);
	}

	render() {
		if (this.props.page < (this.props.maxPages - 1)) {
			return (
				<li>
					<a className="next" href="#" aria-label="Next" onClick={this.handleClick}>
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			);
		}

		return (
			<li className="disabled">
				<span aria-hidden="true">&raquo;</span>
			</li>
		);
	}
}

export default PagerNext;
