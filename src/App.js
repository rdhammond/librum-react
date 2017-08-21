import React, { Component } from 'react';
import Header from 'Header';
import Sidebar from 'Sidebar';
import Books from 'Books';
import AddBook from 'AddBook';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: '',
			contentId: 'books'
		};
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handleContentIdChange = this.handleContentIdChange.bind(this);
	}

	handleFilterChange(filter) {
		this.setState({filter});
	}

	handleContentIdChange(contentId) {
		this.setState({contentId});
	}

	render() {
		const filter = this.state.filter;
		const contentId = this.state.contentId;
		const dataUrl = this.props.dataUrl;

		let content = null;
		switch(contentId) {
			case 'add-book':
				content = <AddBook dataUrl={dataUrl} />;
				break;
			default:
				content = <Books dataUrl={dataUrl} filter={filter} onFilterChange={this.handleFilterChange} />
		}

		return (
			<Header filter={filter} onFilterChange={this.handleFilterChange} />
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-3 col-md-2">
						<Sidebar contentId={contentId} />
					</div>
					<div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">
						{content}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
