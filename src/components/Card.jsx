import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import Figure from 'react-bootstrap/Figure';

const Card = ({ item, handleSelectedCards, toggled, stopFlip, className }) => {
    const handleClick = () => {
        if (!item.matched && !stopFlip) {
            handleSelectedCards(item);
        }
    };

    return (
        <BootstrapCard
            className={`card ${className} ${toggled ? 'is-flipped' : ''} d-flex align-items-center justify-content-center bg-light shadow ${item.matched ? 'matched' : ''}`}
            onClick={handleClick}
            style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
        >
            <BootstrapCard.Body className="d-flex align-items-center justify-content-center p-0" style={{ height: '100px' }}>
                {toggled || item.matched ? (
                    <Figure className="w-100 h-100 m-0">
                        <Figure.Image
                            src={item.image}
                            alt={item.name}
                            className="w-100 h-100"
                            style={{ objectFit: 'cover' }}
                        />
                    </Figure>
                ) : (
                    <div className="text-center w-100 h-100 d-flex align-items-center justify-content-center">
                        <p className="display-4 m-0">?</p>
                    </div>
                )}
            </BootstrapCard.Body>
        </BootstrapCard>
    );
};

export default Card;
