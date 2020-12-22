import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';

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
    </Layout>
);
