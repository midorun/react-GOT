import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

// components
import Header from '../header';
import RandomChar from '../randomChar';
import {
    BooksPage,
    BooksPageItem,
    CharactersPage,
    HousesPage
} from '../Pages';
import ErrorHandler from '../errorHandler';

// styles
import './app.css'

export default class App extends Component {
    state = {
        showRandomChar: null,
        error: false
    }

    componentDidCatch = () => {
        console.log('error');
        this.setState({ error: true })
    }

    componentDidMount = () => {
        if (!localStorage.getItem('showRandomChar')) {
            localStorage.setItem('showRandomChar', JSON.stringify(true))
        }
        this.setState(() => ({ showRandomChar: JSON.parse(localStorage.getItem('showRandomChar')) }))
    }

    toggleRandomChar = () => {
        this.setState(({ showRandomChar }) => {
            showRandomChar = !showRandomChar;
            localStorage.setItem('showRandomChar', JSON.stringify(showRandomChar))
            return {
                showRandomChar
            }
        })
    }

    render() {
        const randomCharComponent = this.state.showRandomChar ? <RandomChar /> : null

        if (this.state.error) {
            return <ErrorHandler />
        }

        return (
            <Router>
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                {randomCharComponent}
                                <button
                                    className="toggleRandomChar"
                                    onClick={this.toggleRandomChar}
                                >
                                    Toggle Random Character
                                </button>
                            </Col>
                        </Row>
                        <Route
                            path='/characters'
                            component={CharactersPage}
                        />
                        <Route
                            path='/houses'
                            component={HousesPage}
                        />
                        <Route
                            exact
                            path='/books'
                            component={BooksPage}
                        />
                        <Route
                            path='/books/:id'
                            render={({ match }) => {
                                const { id } = match.params;
                                return <BooksPageItem
                                    selectedBookId={id}
                                />
                            }}
                        />
                    </Container>
                </div>
            </Router>
        )
    };
};