import { getData } from './api/api.js';
import { render } from './miniature/miniature.js';
import { showAlert } from './util.js';
import './upload-form/upload-form.js';

getData()
  .then((data) => {
    render(data);
  })
  .catch((err) => {
    showAlert(document.body, err.message);
  });
