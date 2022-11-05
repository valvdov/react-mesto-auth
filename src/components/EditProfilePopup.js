import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup({onUpdateUser, isOpen, onClose}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        if (isOpen){
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__text"
                id="name"
                type="text"
                name="name"
                value={name}
                placeholder="Имя"
                required=""
                minLength={2}
                maxLength={40}
                onChange={handleChangeName}
            />
            <span className="popup__text-error name-error" id="name-error"/>
            <input
                className="popup__text"
                id="about"
                type="text"
                name="about"
                value={description}
                placeholder="Профессия"
                required=""
                minLength={2}
                maxLength={200}
                onChange={handleChangeDescription}
            />
            <span className="popup__text-error about-error" id="about-error"/>
        </PopupWithForm>
    );
}
