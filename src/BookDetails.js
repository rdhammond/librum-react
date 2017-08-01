import React, { Component } from 'react';

class BookDetails extends Component {
	constructor(props) {
		super(props);
		this.state.notes = this.props.book.notes;
		this.handleNotesChange = this.handleNotesChange.bind(this);
		this.handleCloseClick = this.handleCloseClick.bind(this);
		this.yearStr = this.yearStr.bind(this);
		this.googleUrl = this.googleUrl.bind(this);
	}

	handleNotesChanged(e) {
		this.setState({notes: e.target.value});
	}

	handleCloseClick(e) {
		this.props.onNotesChanged(this.props.book, this.state.notes);
		$('#bookDetails').dialog('hide');	// ** TODO: Will this work?
	}

	yearStr(book) {
		if (!book.year)
			return '';

		return book.era !== 'CE'
			? year + ' ' + book.era
			: year;
	}

	googleUrl(q) {
		return 'https://www.google.com?q=intext%3A%22' + q + '%22';
	}

	render() {
		const book = this.props.book;
		const notes = this.state.notes;

		return (
			<div id="bookDetails" class="modal fade" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button class="close" type="button" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 class="modal-title">{book.title}</h4>
						</div>
						<div class="modal-body">
							<div class="container-fluid">
								<div class="row">
									<div class="col-sm-12 col-md-4 cover">
										<img class="img-responsive img-thumbnail" src={this.coverUrl(book)} />
									</div>
									<div class="col-sm-12 col-md-8 details">
										<dl class="dl-horizontal">
											<dt>Author</dt>
											<dd>{book.author}</dd>
											<dt>Publisher</dt>
											<dd>{book.publisher}</dd>
											<dt>Year of Publication</dt>
											<dd>{this.yearStr(book)}</dd>
											<dt>Estimated Value</dt>
											<dd>{book.estValue}</dd>
										</dl>
										<div class="form-group">
											<label for="notes">Notes</label>
											<textarea class="form-control" value={this.state.notes} placeholder="Notes (opt.)" rows="5"></textarea>
										</div>
										<div class="links">
											<a href={this.googleUrl(book.title)} target="_blank">Search for more info on title</a>
											<a href={this.googleUrl(book.author)} target="_blank">Search for more info on author</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button class="btn btn-default" type="button" onClick={this.handleCloseClick}>Close</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BookDetails;
