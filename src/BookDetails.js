import React, { Component } from 'react';
import $ from 'jquery';

class BookDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {notes: this.props.book.notes};
		this.handleNotesChanged = this.handleNotesChanged.bind(this);
		this.handleCloseClicked = this.handleCloseClicked.bind(this);
		this.yearStr = this.yearStr.bind(this);
		this.googleUrl = this.googleUrl.bind(this);
		this.coverUrl = this.coverUrl.bind(this);
	}

	coverUrl(book) {
		return book
			? this.props.dataUrl + 'cover/' + book._id
			: null;
	}

	handleNotesChanged(e) {
		this.setState({notes: e.target.value});
	}

	handleCloseClicked(e) {
		this.props.onNotesChanged(this.props.book, this.state.notes);
		$('#bookDetails').dialog('hide');
	}

	yearStr(book) {
		if (!book.year)
			return '';

		return book.era !== 'CE'
			? book.year + ' ' + book.era
			: book.year;
	}

	googleUrl(q) {
		return 'https://www.google.com?q=intext%3A%22' + q + '%22';
	}

	render() {
		const book = this.props.book;
		const notes = this.state.notes;

		return (
			<div id="bookDetails" className="modal fade" tabindex="-1" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button className="close" type="button" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">{book.title}</h4>
						</div>
						<div className="modal-body">
							<div className="container-fluid">
								<div className="row">
									<div className="col-sm-12 col-md-4 cover">
										<img className="img-responsive img-thumbnail" src={this.coverUrl(book)} />
									</div>
									<div className="col-sm-12 col-md-8 details">
										<dl className="dl-horizontal">
											<dt>Author</dt>
											<dd>{book.author}</dd>
											<dt>Publisher</dt>
											<dd>{book.publisher}</dd>
											<dt>Year of Publication</dt>
											<dd id="year">{this.yearStr(book)}</dd>
											<dt>Estimated Value</dt>
											<dd>{book.estValue}</dd>
										</dl>
										<div className="form-group">
											<label htmlFor="notes">Notes</label>
											<textarea id="notes" className="form-control" value={this.state.notes} placeholder="Notes (opt.)" rows="5"></textarea>
										</div>
										<div className="links">
											<a id="google-title" href={this.googleUrl(book.title)} target="_blank">Search for more info on title</a>
											<a id="google-author" href={this.googleUrl(book.author)} target="_blank">Search for more info on author</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button className="btn btn-default" type="button" onClick={this.handleCloseClicked}>Close</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BookDetails;
