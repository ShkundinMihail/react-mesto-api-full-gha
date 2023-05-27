export const BASE_URL = 'https://api.skundinmihail.nomoredomains.monster';
// export const BASE_URL = 'http://localhost:3001';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
           // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => {
            return handleResponse(res);
        })
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: "include",
        headers: {
          //  'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => {
            return handleResponse(res);
        })
}

export const verificationToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        
        },
    })
        .then(res => {
          return handleResponse(res);

        });
};

const handleResponse = (res) => {
    return res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`);
}