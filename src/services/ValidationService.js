class ValidationService {
    regValidation(values) {
        let maxErrorLen = 90;
        let errorMessage = '';
        let errorInputs = [];

        if (!(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(values.email))) {
            errorMessage += 'Некорректный email.';
            errorInputs.push('email');
        }

        if (!(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/.test(values.nick))) {
            errorInputs.push('nick');
            const message = ' Никнейм должен начинаться с латинской буквы, содержать только латинские буквы и цифры, может содержать символы -,_,.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (String(values.nick).length < 6) {
            errorInputs.push('nick');
            const message = ' Никнейм меньше 6 символов.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (!(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/.test(values.pass))) {
            errorInputs.push('pass');
            errorInputs.push('rpass');
            const message = ' Пароль должен содержать латинские буквы и цифры.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (String(values.pass).length < 6) {
            errorInputs.push('pass');
            errorInputs.push('rpass');
            const message = ' Пароль меньше 6 символов.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.pass !== values.rpass) {
            errorInputs.push('pass');
            errorInputs.push('rpass');
            const message = ' Пароли не совпадают.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (!(/^rme[0-9]{3}$/.test(values.code))) {
            errorInputs.push('code');
            const message = ' Неверный код приглашения.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        const status = (errorMessage) ? false : true;


        return {
            errorMessage,
            errorInputs,
            status
        }
    }
    loginValidation(values) {
        let maxErrorLen = 500;
        let errorMessage = '';
        let errorInputs = [];

        if (!(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/.test(values.nick))) {
            errorInputs.push('nick');
            const message = ' Никнейм должен начинаться с латинской буквы, содержать только латинские буквы и цифры, может содержать символы -,_,.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (!(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/.test(values.pass))) {
            errorInputs.push('pass');
            errorInputs.push('rpass');
            const message = ' Пароль должен содержать латинские буквы и цифры.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (String(values.pass).length < 6) {
            errorInputs.push('pass');
            errorInputs.push('rpass');
            const message = ' Пароль меньше 6 символов.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        const status = (errorMessage) ? false : true;


        return {
            errorMessage,
            errorInputs,
            status
        }
    }
}
module.exports = new ValidationService();
