import React, { useState, useEffect } from 'react';
import Card from './Card';
import Data from './Data';
import { Container, Row, Col, Button } from 'react-bootstrap';

function GameBoard() {
    const [cardsArray, setCardsArray] = useState([]);
    const [moves, setMoves] = useState(0);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [stopFlip, setStopFlip] = useState(false);
    const [score, setScore] = useState(0);
    const [won, setWon] = useState(0);
    const [incorrectSelection, setIncorrectSelection] = useState(false);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const shuffledArray = [...Data].sort(() => Math.random() - 0.5);
        setCardsArray(shuffledArray.map(card => ({ ...card, matched: false })));
        setMoves(0);
        setScore(0);
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setWon(0);
        setIncorrectSelection(false);
    };

    const handleSelectedCards = (selectedCard) => {
        if (!stopFlip && selectedCard !== firstCard) {
            firstCard ? setSecondCard(selectedCard) : setFirstCard(selectedCard);
        }
    };

    useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArray(prevArray =>
                    prevArray.map(card =>
                        card.name === firstCard.name ? { ...card, matched: true } : card
                    )
                );
                setScore(prev => prev + 10);
                setWon(prev => prev + 1);
                resetSelection();
            } else {
                setIncorrectSelection(true);
                setTimeout(() => {
                    setIncorrectSelection(false);
                }, 200);
                setTimeout(resetSelection, 1000);
            }
        }
    }, [firstCard, secondCard]);

    const resetSelection = () => {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves(prev => prev + 1);
    };

    return (
        <Container className="p-4 text-light" style={{ maxWidth: '600px', width: '100%' }}>
            <div className="scoreboard mb-3">
                <Button onClick={startNewGame} className="fw-bold">New Game</Button>
                <div className="text-center">
                    <h2 className="h3 fw-bold m-3">Score: {score}</h2>
                    <h2 className="h3 fw-bold">Moves: {moves}</h2>
                </div>
            </div>

            {won === Data.length / 2 && (
                <div className="text-center mb-3" style={{ fontSize: '24px', fontWeight: 'bold', color: 'yellow' }}>
                    You Win!
                </div>
            )}

            <Row className="g-2">
                {cardsArray.map((item) => (
                    <Col xs={3} sm={3} md={3} key={item.id} className="p-2">
                        <Card
                            item={item}
                            handleSelectedCards={handleSelectedCards}
                            toggled={item === firstCard || item === secondCard || item.matched}
                            stopFlip={stopFlip}
                            className={incorrectSelection && !(item.matched || item === firstCard || item === secondCard) ? 'vibrate' : ''}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default GameBoard;
