import React from "react";


function PopupWithForm({name, isOpen, onClose, title, onSubmit, children, buttonText}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={name} id={`${name}-form`} noValidate="">
                    {children}
                    <button
                        className="popup__submit-button"
                        type="submit"
                        id="popup__submit-button-item"

                        onClick={onSubmit}
                    >
                        {buttonText || 'Сохранить'}
                    </button>
                </form>

                <button
                    className="popup__close-button"
                    type="button"
                    id="item-close"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
            </div>
        </div>
    );
}

export default PopupWithForm;