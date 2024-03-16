const database = require('../database/database.js');

class BDService {
    constructor() {
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.getUserByNick = this.getUserByNick.bind(this);
    }

    async getCode() {
        try {
            return {
                data: (await database.query('SELECT * FROM code')).rows[0].code,
                status: true
            };
        } catch(err) {
            console.log('BD: get code error: ' + err);
        }
    }
    async createUser(email, nickname, pass, roole) {
        try {
            (await database.query('INSERT INTO person (email, nickname, pass, roole) values ($1, $2, $3, $4)', [
                email, 
                nickname,  
                pass, 
                roole
            ]));

            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('BD: create user error error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
    async getUserByEmail(email) {
        try {
            return {
                data: (await database.query('SELECT * FROM person WHERE email = $1', [email])).rows,
                status: true
            };
        } catch(err) {
            console.log('BD: get user by email error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
    async getUserByNick(nick) {
        try {
            return {
                data: (await database.query('SELECT * FROM person WHERE nickname = $1', [nick])).rows,
                status: true
            };
        } catch(err) {
            console.log('BD: get user by nick error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    async checkUserExistence(email, nick) {
        try {
            if ((await this.getUserByEmail(email)).data.length) {
                return {
                    status: false,
                    message: 'Пользователь с такой почтой уже существует'
                }
            }

            if ((await this.getUserByNick(nick)).data.length) {
                return {
                    status: false,
                    message: 'Пользователь с таким никнеймом уже существует'
                }
            }

            return {
                status: true,
                message: ''
            }
        } catch(err) {
            console.log('BD: get user existence error: ' + err);
        }
    }
    async getUserIdByNick(nick) {
        try {
            return {
                data: (await database.query('SELECT id FROM person WHERE nickname = $1', [nick])).rows[0].id,
                status: true
            };
        } catch(err) {
            console.log('BD: get user id by nick error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    async saveToken(id, token) {
        try {
            (await database.query('INSERT INTO person_token (person_id, token) values ($1, $2)', [
                id, 
                token,  
            ]));
            
            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('BD: save token error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    async getUserIdByToken(token) {
        try {
            return {
                data: (await database.query('SELECT * FROM person_token WHERE token = $1', [token])).rows[0],
                status: true
            };
        } catch(err) {
            console.log('BD: get user by token: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    async deleteToken(token) {
        try {
            (await database.query('DELETE FROM person_token WHERE token = $1', [token]));
            
            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('BD: save token error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
}

module.exports = new BDService();