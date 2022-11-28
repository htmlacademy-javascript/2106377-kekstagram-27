import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error ();// если .ok === false
    })
    .then((response) => response.json())//извлекает данные и преобразовывает js
    .then((photos) => {
      onSuccess(photos);//отрисовка фото по данным с сервера
    })
    .catch(() => {//если сервер не доступен
      showAlert('Не удалоь загрузить данные с сервера. Попробуйте еще раз');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        throw new Error('Форма не отправлена. Проверте правильность введенных данных');
      }
    })
    .catch((err) => {
      onFail(err.message);
    });
};
//kekstagram
export {getData, sendData};
