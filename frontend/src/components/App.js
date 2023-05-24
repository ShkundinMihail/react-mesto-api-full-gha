import React from 'react';
import { Route, Routes, Navigate, useNavigate, } from 'react-router-dom';
import { Header } from './Header.js';
import api from "../utils/api.js";
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { Login } from './Login';
import { Register } from './Register';
import { InfoTooltip } from './InfoTooltip.js';
import { ImagePopup } from './ImagePopup.js';
import { PopupWithForm } from './PopupWithForm.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { AddPlacePopup } from './AddPlacePopup.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRouteElement from './ProtectedRoute.js';
import { NotFoundPage } from './NotFoundPage.js';
import { register, login, verificationToken } from '../utils/Auth';
import authorizationSuccessfulImage from '../images/good.svg';
import authorizationFailedImage from '../images/bad.svg'
import { AutorizationForm } from './AutorizationForm.js';
import Cookies from 'universal-cookie';
import CookiesII from 'js-cookie';

function App() {
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [photoOpen, setPhotoOpen] = React.useState(false);
  const [popupAvatarOpen, setPopupAvatarOpen] = React.useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpened, setIsAddCardPopupOpened] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState();
  const [InfoTooltipData, setInfoTooltipData] = React.useState({
    text: '',
    image: '',
  });
  const navigate = useNavigate();
  const cookies = new Cookies();
  console.log( typeof document.cookie.jwt)
  const [InfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  //инфа о пользователе
  const [currentUser, setCurrentUser] = React.useState({
    'name': '',
    'about': '',
    'avatar': '',
    '_id': '',
    'cohort': ''
  });
  //проверить токен при загрузке сайта
  React.useEffect(() => {
    checkToken();
  }, []);

  //загрузка карточек на страницу
  React.useEffect(() => {
    if (loggedIn) {
      api.getCards()
        .then((dataCard) => {
          setCards(dataCard);
        })
        .catch((err) => {
          console.log(`Ошибка. Не удалось загрузить карточки 😰: ${err}`);
        });
    }
  }, [loggedIn])// c useEffect у меня дружба сразу не заладилась 😁

  //загрузка инфы о пользователе
  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInformation()
        .then(data => {
          setCurrentUser(data)
        })
        .catch((err) => {
          console.log(`Ошибка данных😩: ${err}`);
        })
    }
  }, [loggedIn]);
  //попапы открыть
  const handleOpenAddCardPopup = () => {
    setIsAddCardPopupOpened(true);
  };

  const handleOpenEditProfilePopup = () => {
    setIsProfilePopupOpen(true);
  };

  const handleOpenEditAvatarPopup = () => {
    setPopupAvatarOpen(true);
  };
  //доделаю...
  // function handleOpenCardDeletePopup() {
  //   setIsCardDeletePopupOpen(true);
  // };
  //открыть попап с карточкой
  function openCard(data) {
    setSelectedCard(data);
    setPhotoOpen(true);

  };
  //закрыть все попапы
  const closeAllPopups = () => {
    setSelectedCard('');
    setPhotoOpen(false);
    setPopupAvatarOpen(false);
    setIsCardDeletePopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsAddCardPopupOpened(false);
    setInfoTooltipOpen(false)
  };
  //удаление карточки
  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId))
      })
      .catch(err => { console.log(`Сбой. Не удалось удалить карточку...🥺${err}`) })
  };
  //поставить лайк
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => { console.log(`Это провал... Не удалось поставить(удалить) лайк... 🥵${err}`) });
  }
  //новая карточка
  const handleAddPlaceSubmit = (title, link) => {
    api.downloadNewCard({ title, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => { console.log(`Фиаско. Не удалось добавить карточку 🤪 ${err}`) })
  }
  //изменение аватара
  const sendAvatarToServer = (link) => {
    api.changeAvatar(link)
      .then(link => {
        setCurrentUser(link)
        closeAllPopups()
      })
      .catch(err => { console.log(`Ошибка. Аватар не обновлён 🤔: ${err}`) })
  }
  //изменение информации о пользователе
  const sendProfileToServer = (textData) => {
    api.changeUserInfo(textData)
      .then(text => {
        setCurrentUser(text)
        closeAllPopups()
      })
      .catch(err => { console.log(`Ошибка. Информация о пользователе не обновлена 😟: ${err}`) })
  }
  //регистрация
  const handleRegister = (email, password) => {
    register(email, password)
      .then(() => {
        setInfoTooltipData({
          text: 'Вы успешно зарегистрировались!',
          image: authorizationSuccessfulImage,
        })
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка регистрации. Попробуйте ещё раз... 😟: ${err}`)
        setInfoTooltipData({
          text: 'Что-то пошло не так!',
          image: authorizationFailedImage,
        })
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      })
  };
  //проверка логина
  const handleLogin = (email, password) => {
    login(email, password)
      .then(data => {
      //  localStorage.setItem('token', data.token);
      document.cookie.set('jwt', data.cookies.jwt)
        setUserEmail(email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch(err => {
        console.log(`Ошибка входа. Введите корректный логин или пройдите регистрацию. 😟: ${err}`);
      })
  }
  //проверка токена
  const checkToken = () => {
    const token = CookiesII.get('jwt');
    console.log(token)
    if (token) {
      verificationToken(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate('/me', { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка входа. Авторизуйтесь или пройдите регистрацию. 😟: ${err}`);
        });
    }
  }
  //выход из аккаунта
  const handleLogOutAccount = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in', { replace: true });
  }
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={userEmail} handleLogOutAccount={handleLogOutAccount} />
        <Routes>
          <Route path="/" element={
            <ProtectedRouteElement
              element={Main}
              onClickAvatar={handleOpenEditAvatarPopup}
              onClickCard={openCard}
              //deleteCard={handleOpenCardDeletePopup}
              onClickUserInfo={handleOpenEditProfilePopup}
              onClickAddPhoto={handleOpenAddCardPopup}
              deleteCard={handleCardDelete}
              onClickLike={handleCardLike}
              cards={cards}
              loggedIn={loggedIn}
            />} />
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} AutorizationForm={AutorizationForm} />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} AutorizationForm={AutorizationForm} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <InfoTooltip onClose={closeAllPopups} text={InfoTooltipData.text} image={InfoTooltipData.image} visible={InfoTooltipOpen} />
        <ImagePopup popupOpen={photoOpen} data={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup popupOpen={popupAvatarOpen} popupClose={closeAllPopups} saveLinkOnServer={sendAvatarToServer} />
        <EditProfilePopup popupOpen={isProfilePopupOpen} popupClose={closeAllPopups} saveTextOnServer={sendProfileToServer} />
        <AddPlacePopup popupOpen={isAddCardPopupOpened} popupClose={closeAllPopups} cardSubmit={handleAddPlaceSubmit} />

        <PopupWithForm
          open={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          title={'Вы уверены?'}
          submit={'Да'}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </>
  )
}



export default App;
