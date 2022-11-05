import React from "react";

function ImagePopup({onClose, card}) {
    return (
        <div className={`popup popup_type_picture ${card.link ? "popup_opened" : ""}`}>
            <div className="picture-container">
                <img src={card.link} className="picture-img" alt={card.name}/>
                <p className="picture-description">{card.name}</p>
                <button
                    className="popup__close-button"
                    type="button"
                    id="image-close"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
            </div>
        </div>
    );
}

export default ImagePopup;