import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup({onAddPlace, isOpen, onClose}) {
    const [place, setPlace] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name: place, link: link });
    }

    function handleChangePlace(e) {
        setPlace(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    React.useEffect(() => {
        if (isOpen) {
            setPlace("");
            setLink("");
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            name="card-add"
            title="Добавить место"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Создать"
            onSubmit={handleSubmit}
        >
            <input
                className="popup__text"
                id="place"
                type="text"
                name="name"
                defaultValue=""
                placeholder="Название"
                required=""
                minLength={2}
                maxLength={30}
                onChange={handleChangePlace}
            />
            <span className="popup__text-error name-error" id="place-error" />
            <input
                className="popup__text"
                id="link"
                type="url"
                name="link"
                defaultValue=""
                placeholder="Ссылка на картинку"
                required
                onChange={handleChangeLink}
            />
            <span className="popup__text-error link-error" id="link-error" />
        </PopupWithForm>
    )
}