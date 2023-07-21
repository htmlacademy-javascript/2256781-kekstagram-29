import { getData } from './api/api.js';
import { render } from './home/home.js';
import { showAlert } from './util.js';
import './upload-image/upload-image.js';
import './upload-form/upload-form.js';

getData()
  .then((data) => {
    render(data);
  })
  .catch((err) => {
    showAlert(document.body, err.message);
  });
