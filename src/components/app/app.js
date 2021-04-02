import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';

// components
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

// styles
import './app.css'
import ErrorHandler from '../errorHandler';

export default class App extends Component {

    state = {
        showRandomChar: true,
        selectedChar: 132,
        error: true
    }

    componentDidCatch = () => {
        console.log('error');
        this.setState({ error: true })
    }

    toggleRandomChar = () => {
        this.setState((state) => ({ showRandomChar: !state.showRandomChar }))
    }

    onCharSelected = (id) => {
        this.setState({ selectedChar: id })
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
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onCharSelected={this.onCharSelected}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails
                                selectedCharId={this.state.selectedChar}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    };
};