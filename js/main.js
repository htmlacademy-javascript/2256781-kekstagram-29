import { getData } from './api/api.js';
import { render, getFilteredPictures } from './home/home.js';
import { showAlert } from './util.js';
import './upload-image/upload-image.js';
import './upload-form/upload-form.js';

let miniatures = [];

getData()
  .then((data) => {
    miniatures = [...data];
    render(miniatures, getFilteredPictures(miniatures));
  })
  .catch((err) => {
    showAlert(document.body, err.message);
  });
