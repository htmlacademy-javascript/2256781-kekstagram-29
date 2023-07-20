import { Url, ExchangeError, Method } from './constants.js';

const exchangeData = (method = Method.GET, errorText, body = null) =>
  fetch(Url[method], { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => exchangeData(Method.GET, ExchangeError.GET_DATA);
const sendData = (body) => exchangeData(Method.POST, ExchangeError.SEND_DATA, body);

export { getData, sendData };
