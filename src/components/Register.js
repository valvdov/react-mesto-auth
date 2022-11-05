import { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';


const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegisterSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        props.handleReg(password, email);
        setEmail('');
        setPassword('');
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <section className="login">
            <h1 className="auth__title">Регистрация</h1>
            <form className="auth__form">
                <input
                    type="email"
                    id="email"
                    onChange={handleEmail}
                    placeholder="Email"
                    className="auth__input"
                />
                <input
                    type="password"
                    onChange={handlePassword}
                    placeholder="Пароль"
                    className="auth__input"
                />
                <button onClick={handleRegisterSubmit} className="auth__button auth__button_register">Зарегистрироваться</button>
            </form>
            <p className="auth__text"> Уже зарегистрированы?  <Link className="auth__link" to="/sign-in">Войти</Link> </p>

        </section>
    )
}

export default withRouter(Register);