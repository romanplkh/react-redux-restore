import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';
import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
	return (
		<ul className="book-list">
			{books.map(book => (
				<li key={book.id}>
					<BookListItem
						book={book}
						onAddedToCart={() => onAddedToCart(book.id)}
					/>
				</li>
			))}
		</ul>
	);
};

class BookListContainer extends Component {
	async componentDidMount() {
		this.props.fetchBooks();
	}

	render() {
		const { books, loading, error, onAddedToCart } = this.props;
		if (loading) {
			return <Spinner />;
		}

		if (error) {
			return <ErrorIndicator />;
		}
		return <BookList books={books} onAddedToCart={onAddedToCart} />;
	}
}

const mapStateToProps = state => {
	const { bookList: { books, loading, error } } = state;

	return {
		books,
		loading,
		error
	};
};

//Own props allows us to get props from component that wraps our connect function
const mapDispatchToProps = (dispatch, ownProps) => {
	const { bookstoreService } = ownProps;
	return {
		//we call this function that returns another function that does not require any args
		fetchBooks: fetchBooks(bookstoreService, dispatch),
		onAddedToCart: id => dispatch(bookAddedToCart(id))
	};

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
	)(BookListContainer)
);
