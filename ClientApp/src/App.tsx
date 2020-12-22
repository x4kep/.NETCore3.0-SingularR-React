import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';

import Bookstores from './components/BookstoreCRUD/Bookstores';
import Bookstore from './components/BookstoreCRUD/Bookstore';
import BookstoreEdit from './components/BookstoreCRUD/BookstoreEdit';
import BookstoreCreate from './components/BookstoreCRUD/BookstoreCreate';

import Books from './components/BookCRUD/Books';
import Book from './components/BookCRUD/Book';
import BookEdit from './components/BookCRUD/BookEdit';
import BookCreate from './components/BookCRUD/BookCreate';

import Authors from './components/AuthorCRUD/Authors';
import Author from './components/AuthorCRUD/Author';
import AuthorEdit from './components/AuthorCRUD/AuthorEdit';
import AuthorCreate from './components/AuthorCRUD/AuthorCreate';

export default () => (
    <Layout>
        <Route exact path='/' component={Bookstores} />
        <Route path='/bookstore/:id' component={Bookstore} />
        <Route path='/bookstoreedit/:id' component={BookstoreEdit} />
        <Route path='/bookstorecreate' component={BookstoreCreate} />

        <Route exact path='/books' component={Books} />
        <Route path='/book/:id' component={Book} />
        <Route path='/bookedit/:id' component={BookEdit} />
        <Route path='/bookcreate' component={BookCreate} />

        <Route exact path='/authors' component={Authors} />
        <Route path='/author/:id' component={Author} />
        <Route path='/authoredit/:id' component={AuthorEdit} />
        <Route path='/authorcreate' component={AuthorCreate} />
    </Layout>
);
