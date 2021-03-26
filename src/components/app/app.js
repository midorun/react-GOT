import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';

// components
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

// styles
import './app.css'

export default class App extends Component {

    state = {
        showRandomChar: true
    }

    toggleRandomChar = () => {
        this.setState((state) => ({ showRandomChar: !state.showRandomChar }))
    }

    render() {

        const randomChar = this.state.showRandomChar ? <RandomChar /> : null

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
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    };
};