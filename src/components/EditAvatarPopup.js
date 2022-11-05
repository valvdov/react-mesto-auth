import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {
    const userAvatar = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: userAvatar.current.value
        });
    }

    React.useEffect(() => {
        if (isOpen) {
            userAvatar.current.value = "";
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Добавить место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__text"
                id="avatarUrl"
                type="url"
                name="link"
                defaultValue=""
                placeholder="Ссылка на картинку"
                ref={userAvatar}
                required
            />
            <span className="popup__text-error link-error" id="avatarUrl-error"/>
        </PopupWithForm>
    )
}