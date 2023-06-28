import { getData } from './api.js';
import { renderPictureList } from './render.js';

const plug = (errMsg) => void errMsg;

getData()
  .then((data) => {
    renderPictureList(data);
  })
  .catch((err) => {
    plug(err.message);
  });
