import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName =(` ${isOwn ? 'button-delete' : 'button-delete_inactive'}`);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `button-like ${ isLiked ? "button-like_active" : ""}`;

    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }


    return (
        <article className="elements__card">
            <img src={card.link} className="elements__card-image" alt={card.name} onClick={handleCardClick}/>
            <div className="elements__card-info">
                <h2 className="elements__card-heading">{card.name}</h2>
                <div className="button-like__container">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="Лайк"
                        onClick={handleLikeClick}
                    ></button>
                    <span className="button-like__counter">{card.likes.length}</span>
                </div>
            </div>
            <button
                className={cardDeleteButtonClassName}
                type="button"
                aria-label="Удалить"
                onClick={handleDeleteClick}
            ></button>
        </article>

    );
}

export default Card;
