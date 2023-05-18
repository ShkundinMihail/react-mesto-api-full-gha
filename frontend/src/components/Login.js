import React from "react";

export function Login({ handleLogin, AutorizationForm }) {

    return (
        <main className="login">
            <h3 className="login__title">Вход</h3>
            <AutorizationForm handleRequest={handleLogin} buttonTitle={'Войти'} />
        </main>
    )
};
