import React from 'react';
import headerLogo from '../images/header-logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header({ loggedIn, email, handleLogOutAccount }) {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo}
        alt="лого" />
      {location.pathname === '/sign-up' && <Link to="/sign-in" className="header__button">Войти</Link>}
      {location.pathname === '/sign-in' && <Link to="/sign-up" className="header__button">Регистрация</Link>}
      {/* {location.pathname !== '/sign-up' && !location.pathname !== "/me" && location.pathname !== '/sign-in' && <Link to="/" className="header__button">Вернуться</Link>} */}
      {/* {!location.pathname && <button onClick={() => navigate(-1)}>Вернуться</button>}  не получилось :(  */}
      {loggedIn && <div className='header__user-section'>
        <h3 className="header__email">{email}</h3>
        <button onClick={handleLogOutAccount} className="header__button">Выйти</button>
      </div>}
    </header>

  )
}
