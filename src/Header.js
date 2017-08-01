import React, { Component } from 'react';

class Header extends Component {
	constructor(props) {
		super(props);
		this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
	}

	handleFilterSubmit(e) {
		this.props.onFilterChange(e.target.value);
	}

	render() {
		const filter = this.props.filter;

		return (
			<nav class="navbar navbar-inverse navbar-fixed-top">
				<div class="container-fluid">
					<div class="navbar-header">
						<button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="#">Librum</a>
					</div>
					<form class="navbar-form navbar-right form-inline" onSubmit={this.handleFilterSubmit}>
						<div class="form-group">
							<label class="sr-only" for="search">Search Keywords</label>
							<input class="form-control" type="text" placeholder="Keywords" value={filter}>
						</div>
						<button class="btn btn-default" type="submit">Filter</button>
					</form>
				</div>
			</nav>
		);
	}
}

export default Header;
