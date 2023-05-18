import React from "react";
import { Link, useLocation } from "react-router-dom";

export const AutorizationForm = ({ handleRequest, buttonTitle }) => {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: ''
    });

    const location = useLocation()

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        handleRequest(email, password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    return (
        <form onSubmit={handleSubmit} className="form-authorizations">
            <input
                name="email"
                type="email"
                className="form-authorizations__input form-authorizations__input_margin-bottom"
                placeholder="Email"
                required
                onChange={handleChange}
            />
            <input
                name="password"
                type="password"
                className="form-authorizations__input"
                placeholder="Пароль"
                required
                onChange={handleChange}
            />
            <button
                className="form-authorizations__submit form-authorizations__submit_margin-bottom"
                type="submit">
                {buttonTitle}
            </button>
            {location.pathname === '/sign-up' && <Link to="/sign-in" className="form-autorizations__enter">Уже зарегистрированы? Войти.</Link>}
        </form>
    )
};
