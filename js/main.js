import { getData } from './api.js';
import { renderMiniatureList } from './miniature.js';
import { renderFullSize } from './full-size/full-size.js';
import { setMiniatureContainerClick } from './modal-window.js';

getData()
  .then((data) => {
    renderMiniatureList(data);
    setMiniatureContainerClick(renderFullSize.bind(null, data));
  })
  .catch(() => {});
