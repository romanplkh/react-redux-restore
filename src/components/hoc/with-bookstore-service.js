import React from 'react';
import { BookstoreServiceConsumer } from '../bookstore-service-context';

const withBookstoreService = () => {
	return Wrapped => {
		return props => {
			return (
				/* Consumer takes the service function, and returns new component with features of this service. So any component wrapped in withBookstoreService will get the access to the props and methods of BookstoreService */
				<BookstoreServiceConsumer>
					{bookstoreService => {
						return <Wrapped {...props} bookstoreService={bookstoreService} />;
					}}
				</BookstoreServiceConsumer>
			);
		};
	};
};

export default withBookstoreService;
