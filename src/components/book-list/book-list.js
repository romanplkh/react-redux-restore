import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested } from '../../actions';
import { bindActionCreators } from 'redux';
import Spinner from '../spinner';
import './book-list.css';

class BookList extends Component {
	async componentDidMount() {
		const { bookstoreService, booksLoaded, booksRequested } = this.props;
		booksRequested();
		// get data
		const data = await bookstoreService.getBooks();
		// send action to store
		booksLoaded(data);
	}

	render() {
		const { books, loading } = this.props;
		if (loading) {
			return <Spinner />;
		}
		return (
			<ul className="book-list">
				{books.map(book => (
					<li key={book.id}>
						<BookListItem book={book} />
					</li>
				))}
			</ul>
		);
	}
}

const mapStateToProps = state => {
	return {
		books: state.books,
		loading: state.loading
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ booksLoaded, booksRequested }, dispatch);

	/* return {
		booksLoaded: newBooks => {
			dispatch(booksLoaded(newBooks));
		}
	}; */
};

export default withBookstoreService()(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(BookList)
);
