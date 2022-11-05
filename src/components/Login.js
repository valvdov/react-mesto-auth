import { useState } from 'react';
import {withRouter} from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLoginSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        } else {
            props.handleLogin(password, email);
            setEmail('');
            setPassword('');
        }
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <section className="login">
            <h1 className="auth__title">
                Вход
            </h1>
            <form className="auth__form">
                <input type="email"
                       id="email"
                       onChange={handleEmail}
                       placeholder="Email"
                       className="auth__input"/>
                <input type="password"
                       id="password"
                       onChange={handlePassword}
                       placeholder="Пароль"
                       className="auth__input"/>
                <button onClick={handleLoginSubmit} className="auth__button">Войти</button>
            </form>
        </section>
    )
}

export default withRouter(Login);