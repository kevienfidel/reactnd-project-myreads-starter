import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import Book from './Book'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {
    static propTypes = {
        selectedBooks: PropTypes.array,
        onChooseBook: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: [],
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
    }

    clearQuery = () => {
        this.setState({
            query: '',
            books: []
        })
    }

    handleSearch = (query) => {
        if (query === '') {
            this.clearQuery(query)
        } else {
            this.updateQuery(query)
            if (this.state.query !== '') {
                BooksAPI.search(query).then(books => {
                    if (!books.error) {
                        books.map((book) => (book.shelf = 'none')) //initializing shelf attribute to 'none'
                        books.map((book) => (
                            this.props.selectedBooks
                                .filter((b) => b.id === book.id)
                                .map(b => book.shelf = b.shelf)))
                        this.setState({books})
                    }else{
                        this.setState({books: []})
                    }
                })
            }
        }
    }

    componentDidMount(){
        console.log('componentDidMount called')
    }

    render() {
        const {onChooseBook} = this.props
        const {query, books} = this.state
        let searchResult

        //the this.state.books doesn't reflected to be cleared by clearQuery()
        //the condition below will force to empty the array for searchResult unless
        //the request from the API with late response will overwrite this.state.books
        //Temporary solution below:
        if (query === '') {
            searchResult = []
        } else {
            console.log('books',books)
            console.log('query',query)
            searchResult = books
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            autoFocus
                            value={query}
                            onChange={(event) => this.handleSearch(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">

                    {searchResult.length !== 0 && (
                        <div className="showing-books">
                            <span> {searchResult.length} results found for the query <b>{query}</b></span>
                        </div>
                    )}
                    <ol className="books-grid">
                        {searchResult.map((book) => (
                            <Book key={book.id} book={book} onChooseBook={onChooseBook}/>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks