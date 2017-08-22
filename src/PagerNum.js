import React, { Component } from 'react';

class PagerNum extends Component {
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

export default PageNum;
