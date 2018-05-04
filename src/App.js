import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './components/BookList'
import SearchBooks from "./components/SearchBooks"
import {Route} from "react-router-dom"

class BooksApp extends Component {
    state = {
        books: []
    };

    getAllBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState(() => ({
                books
            }))
        })
    };

    componentDidMount() {
        this.getAllBooks()
    }

    handleChange = (event, selectedBook) => {
        const shelf = event.target.value;
        BooksAPI.update(selectedBook, shelf).then(() => {
            selectedBook.shelf = shelf;
            this.setState((state) => ({
                books: state.books.filter(b => b.id !== selectedBook.id).concat([selectedBook])
            }))
        })

    };

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookList books={this.state.books}
                              onChooseBook={this.handleChange}/>
                )}/>
                <Route exact path="/search" render={() => (
                    <SearchBooks selectedBooks={this.state.books}
                                 onChooseBook={this.handleChange}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
