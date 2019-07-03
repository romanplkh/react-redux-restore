const updateCartItem = (cartItems, item, idx) => {
	if (idx === -1) {
		return [...cartItems, item];
	} else {
		return cartItems.map(el => (el.id === item.id ? item : el));
	}
};

const deleteAllItems = (itemId, cartItems) => {
	return cartItems.filter(el => el.id !== itemId);
};

const deleteCartItem = (bookCart, book, cartItems) => {
	const numBooksInCart = bookCart.count;
	const price = book.price;

	if (numBooksInCart > 1) {
		return cartItems.map(el =>
			el.id === bookCart.id
				? { ...el, count: el.count - 1, total: el.total - price }
				: el
		);
	}
	return deleteAllItems(book.id, cartItems);
};

const updateShoppingCart = (state, action) => {
	if (state === undefined) {
		return {
			cartItems: [],
			orderTotal: 0
		};
	}

	const {
		bookList: { books }
	} = state;
	switch (action.type) {
		case 'BOOK_ADDED_TO_CART':
			const bookID = action.payload;
			const book = books.find(el => el.id === bookID);
			let bookIndexCart = state.shoppingCart.cartItems.findIndex(
				el => el.id === book.id
			);
			let bookItemCart = state.shoppingCart.cartItems[bookIndexCart];

			let newBook;

			if (bookIndexCart !== -1) {
				newBook = {
					...bookItemCart,
					count: bookItemCart.count + 1,
					total: bookItemCart.total + book.price
				};
			} else {
				newBook = {
					id: book.id,
					title: book.title,
					count: 1,
					total: book.price
				};
			}

			return {
				...state,
				cartItems: updateCartItem(
					state.shoppingCart.cartItems,
					newBook,
					bookIndexCart
				)
			};

		case 'BOOK_REMOVED_FROM_CART':
			const bookCart = state.shoppingCart.cartItems.find(
				el => el.id === action.payload
			);
			const aBook = state.bookList.books.find(el => el.id === action.payload);
			return {
				...state,
				cartItems: deleteCartItem(bookCart, aBook, state.shoppingCart.cartItems)
			};

		case 'ALL_BOOKS_REMOVED_FROM_CART':
			return {
				...state,
				cartItems: deleteAllItems(action.payload, state.shoppingCart.cartItems)
			};

		default:
			return state.shoppingCart;
	}
};


export default updateShoppingCart;