import React, { Component } from 'react';

class Alert extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const header = this.props.header;
		const msg = this.props.msg;
		const type = 'alert alert-' + (this.props.type || 'danger')
		if (!header || !msg)
			return null;

		return (
			<div className={type} role="alert">
				<strong className="alert-header">{header}</strong>
				<span className="alert-msg">{msg}</span>
			</div>
		);
	}
}

export default Alert;
