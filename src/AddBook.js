import React, { Component } from 'react';
import LibrumApi from './LibrumApi';
import Alert from './Alert';

const DEFAULT_COVER = 'img/cover-placeholder.png';

class AddBook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			alertHeader: null,
			alertMsg: null,
			alertType: null,
			coverUrl: DEFAULT_COVER,
			cover: null,
			title: '',
			author: '',
			year: null,
			era: '',
			publisher: '',
			estValue: null
		};
		this.handleAlertHeaderChanged = this.handleAlertHeaderChanged.bind(this);
		this.handleAlertMsgChanged = this.handleAlertMsgChanged.bind(this);
		this.handleAlertTypeChanged = this.handleAlertTypeChanged.bind(this);
		this.handleTitleChanged = this.handleTitleChanged.bind(this);
		this.handleAuthorChanged = this.handleAuthorChanged.bind(this);
		this.handleYearChanged = this.handleYearChanged.bind(this);
		this.handleEraChanged = this.handleEraChanged.bind(this);
		this.handlePublisherChanged = this.handlePublisherChanged.bind(this);
		this.handleEstValueChanged = this.handleEstValueChanged.bind(this);
		this.handleCoverChanged = this.handleCoverChanged.bind(this);
		this.handleCoverUrlChanged = this.handleCoverUrlChanged.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleBookAdded = this.handleBookAdded.bind(this);
		this.reset = this.reset.bind(this);

		this.api = new LibrumApi(this.props.dataUrl);
	}

	handleAlertHeaderChanged(e) {
		this.state.alertHeader = e.target.value;
	}

	handleAlertMsgChanged(e) {
		this.state.alertMsg = e.target.value;
	}

	handleAlertTypeChanged(e) {
		this.state.alertType = e.target.value;
	}

	handleTitleChanged(e) {
		this.state.title = e.target.value;
	}

	handleAuthorChanged(e) {
		this.state.author = e.target.value;
	}

	handleYearChanged(e) {
		// ** TODO: Combo validation
		this.state.year = e.target.value;
	}

	handleEraChanged(e) {
		// ** TODO: Combo validation
		this.state.era = e.target.value;
	}

	handlePublisherChanged(e) {
		this.state.publisher = e.target.value;
	}

	handleEstValueChanged(e) {
		this.state.estValue = e.target.value;
	}

	handleCoverChanged(cover) {
		this.setState({cover});
		
		return this.api.previewCover(cover)
		.then(result => this.handleCoverUrlChanged(result));
	}

	handleCoverUrlChanged(result) {
		if (result.error) {
			this.setState({
				alertHeader: 'Uh oh.',
				alertMsg: 'Something went wrong uploading to the server.',
				alertType: 'danger'
			});
			return;
		}
		this.setState({coverUrl: result.base64uri});
	}

	handleSubmit() {
		return this.api.postBook({
			title: this.state.title,
			author: this.state.author,
			year: this.state.year,
			era: this.state.era,
			publisher: this.state.publisher,
			estValue: this.state.estValue
		})
		.then(result => this.handleBookAdded(result))
		.catch(error => this.handleBookAdded(error));
	}

	handleBookAdded(response) {
		if (response.error) {
			this.reset();
			this.setState({
				alertHeader: 'Failed.',
				alertMsg: 'Check all your values and try again.',
				alertType: 'danger'
			});
			return;
		}

		return this.api.setCover(response._id, this.state.cover)
		.then(result => this.handleCoverSet(result))
		.catch(error => this.handleCoverSet(error));
	}

	handleCoverSet(response) {
		this.reset();

		if (response.error) {
			this.setState({
				alertHeader: 'Cover upload failed.',
				alertMsg: 'Your book was added, but the cover didn\'t make it.',
				alertType: 'warning'
			});
			return;
		}

		this.setState({
			alertHeader: 'Added!',
			alertMsg: 'You can continue to add more books below.',
			alertType: 'success'
		});
	}
	
	reset() {
		this.setState({
			coverUrl: DEFAULT_COVER,
			cover: null,
			title: '',
			author: '',
			year: null,
			era: '',
			publisher: '',
			estValue: 0
		});
	}

	render() {
		const alertHeader = this.state.alertHeader;
		const alertMsg = this.state.alertMsg;
		const alertType = this.state.alertType;
		const coverUrl = this.state.coverUrl;
		const cover = this.state.cover;
		const title = this.state.title;
		const author = this.state.author;
		const year = this.state.year;
		const era = this.state.era;
		const publisher = this.state.publisher;
		const estValue = this.state.estValue;

		return (
			<div>
				<h1>Add book</h1>
				<Alert header={alertHeader} msg={alertMsg} type={alertType} />
				<form id="frmAddBook" class="container" onSubmit={this.handleSubmit}>
					<div class="row">
						<div class="col-md-3 cover">
							<PhotoUpload coverUrl={coverUrl} onChanged={this.handleCoverChanged} />
						</div>
						<div class="col-md-9 data">
							<div class="form-group">
								<label for="title">Book Title</label>
								<input id="title" class="form-control" type="text" placeholder="Title (required)" required="true" value={title} onChange={this.handleTitleChanged} />
							</div>
							<div class="form-group">
								<label for="author">Author</label>
								<input id="author" class="form-control" type="text" placeholder="Author (required)" required="true" value={author} onChange={this.handleAuthorChanged} />
							</div>
							<div class="form-group">
								<label for="year">Year</label>
								<div class="row">
									<div class="col-md-10">
										<input id="year" class="form-control" type="number" placeholder="Year" min-value="1" value={year} onChange={this.handleYearChanged} />
									</div>
									<div class="col-md-2">
										<select class="form-control" value={era} onChange={this.handleEraChanged}>
											<option value=""></option>
											<option value="CE">CE</option>
											<option value="BCE">BCE</option>
										</select>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label for="publisher">Publisher</label>
								<input id="publisher" class="form-control" type="text" placeholder="Publisher" value={publisher} onChange={this.handlePublisherChanged} />
							</div>
							<div class="form-group">
								<label for="estValue">Estimated Value</label>
								<div class="input-group">
									<span class="input-group-addon">$</span>
									<input id="estValue" class="form-control" type="number" placeholder="Value" min-value="0" value={estValue} onChange={this.handleEstValueChanged} />
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 text-right">
							<input class="btn btn-primary" type="submit" value="Add" />
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default AddBook;
