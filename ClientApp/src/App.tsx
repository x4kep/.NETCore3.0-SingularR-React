import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import Bookstores from './components/BookstoreCRUD/Bookstores';
import Bookstore from './components/BookstoreCRUD/Bookstore';
import BookstoreEdit from './components/BookstoreCRUD/BookstoreEdit';
import BookstoreCreate from './components/BookstoreCRUD/BookstoreCreate';

export default () => (
    <Layout>
        <Route exact path='/' component={Bookstores} />
        <Route path='/bookstore/:id' component={Bookstore} />
        <Route path='/bookstoreedit/:id' component={BookstoreEdit} />
        <Route path='/bookstorecreate' component={BookstoreCreate} />
        <Route path='/home' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
