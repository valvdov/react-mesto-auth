import truth from "../images/truth.svg"
import error from "../images/error.svg"

const InfoToolTip = (props) => {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div className="popup_type_infotooltip">
                <button                     className="popup__close-button"
                                            type="button"
                                            id="item-close"
                                            aria-label="Закрыть"
                                            onClick={props.onClose} />
                <img alt="Успешно!" className="popup_type_infotooltip__image" src={
                    props.successfulReg
                        ? truth
                        : error}
                />
                <h2 className="popup_type_infotooltip__text">{
                    props.successfulReg
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
        </div>
    )
}

export default InfoToolTip;