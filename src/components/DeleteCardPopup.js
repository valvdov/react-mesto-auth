import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup({isOpen, onClose, onSubmit}) {
    return (
        <PopupWithForm
            name="popup-place-delete"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
        />
    );
}
