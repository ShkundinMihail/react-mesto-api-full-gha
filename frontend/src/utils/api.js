
class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    };
    //возвращаем результат работы метода json если все ок, иначе возвращаем ошибку
    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    };
    //данные о пользователе с сервера////////////////////////
    getUserInformation() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: "include",
            headers: this._headers,
        })
            .then(res => this._getResponse(res))
    };
    //аватар пользователя с сервера//////////////////////////

    //карточки с сервера/////////////////////////////////////
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            credentials: "include",
            headers: this._headers,
        })
            .then(res => this._getResponse(res));
    };
    //изменение текста о себе/////////////////////////////////
    changeUserInfo(value) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: value.name,
                about: value.about
            })
        })
            .then(res => this._getResponse(res));
    };
    //загрузка новой карточки///////////////////////////////////
    downloadNewCard(value) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: value.title,
                link: value.link
            })
        })
            .then(res => this._getResponse(res));
    };
    //редактирование аватара///////////////////////////////////////
    changeAvatar(value) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: value
            })
        })
            .then(res => this._getResponse(res));
    };
    //ставим лайк/////////////////////////////////////
    putLikeEl(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._getResponse(res));
    };
    //удаляем лайк/////////////////////////////////////////////
    deleteLikeEL(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._getResponse(res));
    };
    //удаляем карточку////////////////////////////////////////////////
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._getResponse(res));
    };
    //если нет лайка ставим, иначе удаляем////////////////////////
    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.putLikeEl(cardId);
        } else {
            return this.deleteLikeEL(cardId);
        }
    };
}
const api = new Api({
    baseUrl: 'https://api.skundinmihail.nomoredomains.monster',
    headers: {
        // authorization: '22484fcb-aa03-43f2-ad62-a17b1e9a91a9',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
    }
}
);

export default api