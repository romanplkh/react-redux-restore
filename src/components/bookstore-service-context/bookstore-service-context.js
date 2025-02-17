import React from 'react';

const {
	Provider: BookstoreServiceProvider,
	Consumer: BookstoreServiceConsumer
} = React.createContext();

export { BookstoreServiceConsumer, BookstoreServiceProvider };
