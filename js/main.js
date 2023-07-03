import { getData } from './api.js';
import { renderMiniatureList } from './miniature.js';
import { openModalWindow } from './modal-window.js';

const plug = (errMsg) => void errMsg;

getData()
  .then((data) => {
    renderMiniatureList(data);
  })
  .catch((err) => {
    plug(err.message);
  });
