import React from 'react';
import GameBoard from './components/GameBoard';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container className="justify-content-center">
          <Navbar.Brand>Memory Game</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <GameBoard />
      </Container>
    </div>
  );
}

export default App;
