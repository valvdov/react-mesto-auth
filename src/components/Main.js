import {useContext} from "react";
import Card from "./Card.js";
import profileImageEdit from '../images/button_edit.svg'
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CardsContext} from "../contexts/CardContext";

function Main({
                  onEditAvatar,
                  onEditProfile,
                  onAddPlace,
                  onCardClick,
                  onCardLike,
                  onCardDelete
              }) {


    const currentUser = useContext(CurrentUserContext);
    const cards = useContext(CardsContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__main">
                    <div className="profile__image-container">
                        <img
                            src={currentUser.avatar}
                            alt="Аватар пользователя"
                            className="profile__image"
                        />
                        <span className="profile__image-span" onClick={onEditAvatar}>
            <img
                src={profileImageEdit}
                className="profile__image-edit"
                alt="Редактировать"

            />
          </span>
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button
                                className="profile__edit-button"
                                type="button"
                                aria-label="Редактировать"
                                onClick={onEditProfile}
                            />
                        </div>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить"
                    onClick={onAddPlace}
                />
            </section>
            <section className="elements">
                {cards.map((card) => (<Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike}
                                            onCardDelete={onCardDelete}/>))}
            </section>
        </main>
    );
}

export default Main;