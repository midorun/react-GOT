import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';

// components
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../CharacterPage';
import ErrorHandler from '../errorHandler';
import BooksPage from '../BooksPage';

// styles
import './app.css'


export default class App extends Component {
    state = {
        showRandomChar: false,
        error: false
    }

    componentDidCatch = () => {
        console.log('error');
        this.setState({ error: true })
    }

    toggleRandomChar = () => {
        this.setState((state) => ({ showRandomChar: !state.showRandomChar }))
    }

    render() {

        const randomChar = this.state.showRandomChar ? <RandomChar /> : null

        if (this.state.error) {
            return <ErrorHandler />
        }

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {randomChar}
                            <button
                                className="toggleRandomChar"
                                onClick={this.toggleRandomChar}
                            >
                                Toggle Random Character
                            </button>
                        </Col>
                    </Row>
                    <CharacterPage />
                    <BooksPage />
                </Container>
            </>
        )
    };
};