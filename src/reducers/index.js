import updateBookList from './bookList';
import updateShoppingCart from './shoppingCart';

const initialState = {
	bookList: {
		books: [],
		loading: true,
		error: null
	},
	shoppingCart: {
		cartItems: [],
		orderTotal: 0
	}
};

const reducer = (state, action) => {
	return {
		bookList: updateBookList(state, action),
		shoppingCart: updateShoppingCart(state, action)
	};
};

export default reducer;
