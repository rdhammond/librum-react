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
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="#">Librum</a>
					</div>
					<form className="navbar-form navbar-right form-inline" onSubmit={this.handleFilterSubmit}>
						<div className="form-group">
							<label className="sr-only" for="search">Search Keywords</label>
							<input className="filter form-control" type="text" placeholder="Keywords" defaultValue={filter}/>
						</div>
						<button className="btn btn-default" type="submit">Filter</button>
					</form>
				</div>
			</nav>
		);
	}
}

export default Header;
