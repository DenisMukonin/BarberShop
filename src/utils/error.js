const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден!',
    INVALID_PASSWORD: 'Неверный пароль',
    ERR_INTERNET_DISCONNECTED: 'Нет доступа в Интернет',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Доступ к этой учетной записи был временно отключен из-за множества неудачных попыток входа в систему',
    MISSING_EMAIL: 'Отсутствует электронная почта',
    'Auth token is expired': 'Срок действия токена аутентификации истек! Войдите в систему заного!',
    auth: 'Пожалуйста войдите в систему'

}

export function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}
