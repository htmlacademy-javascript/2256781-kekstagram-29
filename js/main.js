import { getData } from './api.js';
import { renderMiniatureList } from './miniature.js';
import { renderFullSize } from './full-size.js';
import { setMiniatureClick } from './modal-window.js';

const plug = (errMsg) => void errMsg;

getData()
  .then((data) => {
    renderMiniatureList(data);
    setMiniatureClick(renderFullSize.bind(null, data));
  })
  .catch((err) => {
    plug(err.message);
  });
