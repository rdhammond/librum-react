import React, { Component } from 'react';

class Alert extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const header = this.props.header;
		const msg = this.props.msg;
		const type = 'alert-' + (this.props.type || 'error')
		if (!header || !msg)
			return null;

		return (
			<div class="alert" className={type} role="alert">
				<strong>{header}</strong>
				<span>{msg}</span>
			</div>
		);
	}
}

export default Alert;
