import React, { Component } from 'react';
import LibrumApi from './LibrumApi';
import Alert from './Alert';
import PhotoUpload from './PhotoUpload'

const DEFAULT_COVER = 'img/cover-placeholder.png';

class AddBook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			alertHeader: null,
			alertMsg: null,
			alertType: null,
			thumbnailUrl: DEFAULT_COVER,
			cover: null,
			title: '',
			author: '',
			year: '',
			era: '',
			publisher: '',
			estValue: ''
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
		this.handleSubmit = this.handleSubmit.bind(this);
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

	async handleCoverChanged(cover) {
		const data = await this.api.previewCover(cover);
		if (data.code) {
			this.setState({
				alertHeader: 'Uh oh.',
				alertMsg: 'Something went wrong uploading to the server.',
				alertType: 'danger'
			});
			this.setState({cover: null});
			return;
		}
		this.setState({cover});
		this.setState({thumbnailUrl: data.base64uri});
	}

	async handleSubmit() {
		const data = await this.api.postBook({
			title: this.state.title,
			author: this.state.author,
			year: this.state.year,
			era: this.state.era,
			publisher: this.state.publisher,
			estValue: this.state.estValue,
			cover: this.state.cover
		});
		this.reset();

		if (data.code) {
			this.setState({
				alertHeader: 'Failed.',
				alertMsg: 'Check all your values and try again.',
				alertType: 'danger'
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
			thumbnailUrl: DEFAULT_COVER,
			cover: null,
			title: '',
			author: '',
			year: '',
			era: '',
			publisher: '',
			estValue: ''
		});
	}

	render() {
		const alertHeader = this.state.alertHeader;
		const alertMsg = this.state.alertMsg;
		const alertType = this.state.alertType;
		const thumbnailUrl = this.state.thumbnailUrl;
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
				<form id="frmAddBook" className="container" onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col-md-3 cover">
							<PhotoUpload thumbnailUrl={thumbnailUrl} onChanged={this.handleCoverChanged} />
						</div>
						<div className="col-md-9 data">
							<div className="form-group">
								<label htmlFor="title">Book Title</label>
								<input id="title" className="form-control" type="text" placeholder="Title (required)" required="true" value={title} onChange={this.handleTitleChanged} />
							</div>
							<div className="form-group">
								<label htmlFor="author">Author</label>
								<input id="author" className="form-control" type="text" placeholder="Author (required)" required="true" value={author} onChange={this.handleAuthorChanged} />
							</div>
							<div className="form-group">
								<label htmlFor="year">Year</label>
								<div className="row">
									<div className="col-md-10">
										<input id="year" className="form-control" type="number" placeholder="Year" min="1" value={year} onChange={this.handleYearChanged} />
									</div>
									<div className="col-md-2">
										<select id="era" className="form-control" value={era} onChange={this.handleEraChanged}>
											<option value=""></option>
											<option value="CE">CE</option>
											<option value="BCE">BCE</option>
										</select>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="publisher">Publisher</label>
								<input id="publisher" className="form-control" type="text" placeholder="Publisher" value={publisher} onChange={this.handlePublisherChanged} />
							</div>
							<div className="form-group">
								<label htmlFor="estValue">Estimated Value</label>
								<div className="input-group">
									<span className="input-group-addon">$</span>
									<input id="estValue" className="form-control" type="number" placeholder="Value" min="0" value={estValue} onChange={this.handleEstValueChanged} />
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 text-right">
							<input className="btn btn-primary" type="submit" value="Add" />
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default AddBook;
