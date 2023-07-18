import { getData } from './api.js';
import { renderMiniatureList } from './miniature.js';
import { setModalWindowHandlers } from './modal-window.js';
import './upload-form/upload-form.js';

getData()
  .then((data) => {
    renderMiniatureList(data);
    setModalWindowHandlers(data);
  })
  .catch(() => {});
