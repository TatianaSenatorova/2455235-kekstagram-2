import {
  BASE_URL,
  Route,
  Method,
  ErrorIdTemplates
} from './constants';

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(err);
    });

const getData = () => load(Route.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export { getData, sendData, ErrorIdTemplates };
