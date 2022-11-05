class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserProfile() {
        return fetch(`${this._baseUrl}/cohort-50/users/me`, {
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cohort-50/cards`, {
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }

    setUserProfile(info) {
        return fetch(`${this._baseUrl}/cohort-50/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about,
            }),
        }).then((res) => this._getResponse(res));
    }

    setAvatar(info) {
        return fetch(`${this._baseUrl}/cohort-50/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar: info.avatar}),
        }).then((res) => this._getResponse(res));
    }

    postCard(info) {
        return fetch(`${this._baseUrl}/cohort-50/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                link: info.link,
            }),
        }).then((res) => this._getResponse(res));
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cohort-50/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }

    changeLikes(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cohort-50/cards/${cardId}/likes`, {
            method: `${isLiked ? "DELETE" : "PUT"}`,
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const apiData = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1',
    headers: {
        authorization: '4b7aeb8e-d3bb-4c4d-815e-f3847a741fa0',
        'Content-Type': 'application/json',
    },
});
