import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        category: PropTypes.string.isRequired,
        onChooseBook: PropTypes.func.isRequired
    }

    render() {
        const {books, category, onChooseBook} = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{category}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <Book key={book.id}
                                  book={book}
                                  onChooseBook={onChooseBook}
                            />
                        ))}
                    </ol>
                </div>
            </div>


        )
    }

}

export default BookShelf