import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'

class BookList extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onChooseBook: PropTypes.func.isRequired
    };

    render() {
        const SHELVES = [
            {category: 'Currently Reading', name: 'currentlyReading'},
            {category: 'Want To Read', name: 'wantToRead'},
            {category: 'Read', name: 'read'}
        ];

        const {books, onChooseBook} = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div>
                            {SHELVES.map((shelf) => (
                                <BookShelf key={shelf.category}
                                           category={shelf.category}
                                           onChooseBook={onChooseBook}
                                           books={books.filter(book => book.shelf === shelf.name)}/>))
                            }
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">
                        Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookList
