const serverHost = process.env.REACT_APP_SERVER_HOST;

class FetchService {
    async reg(dataToSend) {
        return await fetch(`${serverHost}/reg`, {
            credentials: 'include',
            method: 'POST', 
            body: JSON.stringify(
                dataToSend
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            const status = res.status;
            const data = await res.json();

            return {
                status: (status == 200) ? true : false,
                message: data.message,
                accessToken: data.accessToken
            }
        })
        .catch(() => {
            return {
                status: false,
                message: 'Непредвиденная ошибка',
                data: null
            }
        });
    }
    async login(dataToSend) {
        return await fetch(`${serverHost}/login`, {
            credentials: 'include',
            method: 'POST', 
            body: JSON.stringify(
                dataToSend
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            const status = res.status;
            const data = await res.json();

            return {
                status: (status == 200) ? true : false,
                message: data.message,
                accessToken: data.accessToken
            }
        })
        .catch(() => {
            return {
                status: false,
                message: 'Непредвиденная ошибка',
                data: null
            }
        });
    }
    async refresh() {
        return await fetch(`${serverHost}/refresh`, {
            credentials: 'include',
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            const status = res.status;
            const data = await res.json();

            return {
                status: (status == 200) ? true : false,
                data
            }
        })
        .catch(() => {
            return {
                status: false,
                data: {message: 'Непредвиденная ошибка'}
            }
        });
    }
    async checkAuth() {
        return await fetch(`${serverHost}/check_auth`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        .then(async (res) => {
            const status = res.status;
            const data = await res.json();

            return {
                status: (status == 200) ? true : false,
                data
            }
        })
        .catch(() => {
            return {
                status: false,
                data: null
            }
        });
    }
}
module.exports = new FetchService();