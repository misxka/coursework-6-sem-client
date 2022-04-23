export interface ErrorInfo {
  errorCode: string;
  errorMessage: string;
}

const errors: ErrorInfo[] = [
  {
    errorCode: '401',
    errorMessage: 'Вы не авторизованы.'
  },
  {
    errorCode: '403',
    errorMessage: 'У Вас нет доступа к этому ресурсу.'
  },
  {
    errorCode: '500',
    errorMessage: 'Ошибка на сервере.'
  }
];

export { errors };
