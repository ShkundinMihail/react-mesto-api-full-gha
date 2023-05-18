import React from 'react';
import closeIcon from '../images/Close-Icon.svg'

export function ImagePopup({ popupOpen, onClose, data }) {

    return (
        <>
            <div className={`popup popup_photo ${popupOpen ? 'popup_opened' : ''}`}>
                <div className="popup__content-photo">
                    <button className="popup__close"
                        onClick={onClose}
                        id="close-photo-popup" type="button"
                        name="close-popup"><img
                            className="popup__close-icon"
                            src={closeIcon}
                            alt="Х" /></button>
                    <img className="popup__open-photo"
                        src={popupOpen ? data.link : ''} alt={popupOpen ? data.alt : ''} />
                    <h2 className="popup__open-title">{popupOpen ? data.name : ''}</h2>
                </div>
            </div>
        </>
    );
}
