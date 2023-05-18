import React from "react";

export function Register({ handleRegister, AutorizationForm }) {

    return (
        <main className="login">
            <h3 className="login__title">Регистрация</h3>
            <AutorizationForm handleRequest={handleRegister} buttonTitle={'Зарегистрироваться'} />
        </main>
    )
}
