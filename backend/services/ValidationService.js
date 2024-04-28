export default class ValidationService {
    static regValidation(values) {
        let maxErrorLen = 90;
        let errorMessage = '';

        if (!(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(values.email))) {
            errorMessage += 'Некорректный email.';
            errorInputs.push('email');
        }

        if (!(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/.test(values.nick))) {
            const message = ' Никнейм должен начинаться с латинской буквы, содержать только латинские буквы и цифры, может содержать символы -,_,.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (String(values.nick).length < 6) {
            const message = ' Никнейм меньше 6 символов.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (!(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/.test(values.pass))) {
            const message = ' Пароль должен содержать латинские буквы и цифры.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (String(values.pass).length < 6) {
            const message = ' Пароль меньше 6 символов.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.pass !== values.rpass) {
            const message = ' Пароли не совпадают.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (!(/^rme[0-9]{3}$/.test(values.code))) {
            const message = ' Неверный код приглашения.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        const status = (errorMessage) ? false : true;


        return {
            errorMessage,
            status
        }
    }
    static loginValidation(values) {
        let maxErrorLen = 500;
        let errorMessage = '';

        if (!(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/.test(values.nick))) {
            const message = ' Никнейм должен начинаться с латинской буквы, содержать только латинские буквы и цифры, может содержать символы -,_,.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (!(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/.test(values.pass))) {
            const message = ' Пароль должен содержать латинские буквы и цифры.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (String(values.pass).length < 6) {
            const message = ' Пароль меньше 6 символов.';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        const status = (errorMessage) ? false : true;


        return {
            errorMessage,
            status
        }
    }
}