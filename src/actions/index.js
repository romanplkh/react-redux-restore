const booksRequested = () => {
	return {
		type: 'FETCH_BOOKS_REQUEST'
	};
};

const booksLoaded = newBooks => {
	return {
		type: 'FETCH_BOOKS_SUCCESS',
		payload: newBooks
	};
};

const booksError = error => {
	return {
		type: 'FETCH_BOOKS_FAILURE',
		payload: error
	};
};

const fetchBooks = (bookstoreService, dispatch) => async () => {
	try {
		dispatch(booksRequested());
		// get data
		const data = await bookstoreService.getBooks();
		// send action to store
		dispatch(booksLoaded(data));
	} catch (error) {
		dispatch(booksError(error));
	}
};

const bookAddedToCart = bookID => {
	return {
		type: 'BOOK_ADDED_TO_CART',
		payload: bookID
	};
};

const bookRemovedFromCart = bookID => {
	return {
		type: 'BOOK_REMOVED_FROM_CART',
		payload: bookID
	};
};

const allBooksRemovedFromCart = bookID => {
	return {
		type: 'ALL_BOOKS_REMOVED_FROM_CART',
		payload: bookID
	};
};

export {
	fetchBooks,
	bookAddedToCart,
	bookRemovedFromCart,
	allBooksRemovedFromCart
};
