import React from "react";
import headerLogo from "../images/logo_white.svg";
import {Link, Route, Switch} from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <img
                src={headerLogo}
                className="logo"
                alt="ЛОГО МЕСТО"
            />
            <Switch>
                <Route exact path="/">
                    <div className="header__info">
                        <span className="header__email">{props.email}</span>
                        <Link
                            to="/sign-in"
                            onClick={props.handleLogOut}
                            className="header__link"
                        >
                            Выйти
                        </Link>
                    </div>
                </Route>

                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__link">
                        Регистрация
                    </Link>
                </Route>

                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__link">
                        Войти
                    </Link>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;