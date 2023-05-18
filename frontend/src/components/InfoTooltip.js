import React from "react";
import closeIcon from '../images/Close-Icon.svg';

export function InfoTooltip({text,image,visible,onClose}) {

    return (
        <div className={`popup  ${visible ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button className="popup__close" type="button" ><img className="popup__close-icon" src={closeIcon} alt="Х" onClick={onClose} /></button>
                <img className="popup__image-authorization" src={image} alt='результат авторизации'></img>
                <h3 className="popup__title popup__title_text-align">{text}</h3>
            </div>
        </div>
    )
} 
