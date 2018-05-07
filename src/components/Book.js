import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChooseBook: PropTypes.func.isRequired
    };

    render() {
        const {book, onChooseBook} = this.props

        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={book.imageLinks && book.imageLinks.thumbnail && {
                                 width: 128,
                                 height: 193,
                                 backgroundImage: `url(${book.imageLinks.thumbnail})`
                             }}/>
                        <div className="book-shelf-changer">
                            <select defaultValue={book.shelf ? book.shelf : "none"}
                                    onChange={(event) => onChooseBook(event, book)}>
                                <option value="moveTo" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book