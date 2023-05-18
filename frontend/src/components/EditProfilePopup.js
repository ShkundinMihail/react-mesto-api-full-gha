import React from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditProfilePopup({ popupOpen, popupClose, saveTextOnServer }) {
    const context = React.useContext(CurrentUserContext);

    const [userName, setUserName] = React.useState('');
    const [userWork, setUserWork] = React.useState('');

    const changeName = (e) => {
        setUserName(e.target.value)
    };

    const changeWork = (e) => {
        setUserWork(e.target.value)
    };

    React.useEffect(() => {
        setUserName(context.name);
        setUserWork(context.about);
    }, [context]);

    const submitProfile = (e) => {
        e.preventDefault();
        saveTextOnServer({ name: userName, about: userWork })
    };

    return (
        <PopupWithForm
            popupOpen={popupOpen}
            onClose={popupClose}
            onSubmit={submitProfile}
            title={'Редактировать профиль'}
            submit={'Сохранить'}
            children={
                <>
                    <input
                        value={userName}
                        onChange={changeName}
                        className="popup__input-style popup__input-style_edit_name"
                        id="name"
                        placeholder="Имя"
                        type="text"
                        minLength="2"
                        maxLength="40"
                        required
                        data-valid-value="в поле «Имя» должно быть от 2 до
                40
                символов"/>
                    <span
                        className="popup__form-error popup__form-error_position"
                        id="name-error"></span>
                    <input
                        value={userWork}
                        onChange={changeWork}
                        className="popup__input-style popup__input-style_edit_work"
                        id="work"
                        placeholder="О себе"
                        type="text"
                        minLength="2"
                        maxLength="200"
                        required
                        data-valid-value="в поле «О себе» должно быть от 2 до 200 символов" />
                    <span
                        className="popup__form-error"
                        id="work-error"></span>
                </>
            }
        />

    )
}
