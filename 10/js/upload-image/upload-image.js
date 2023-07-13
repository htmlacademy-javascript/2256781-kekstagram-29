// import { uploadElement, previewElement, effectElement } from './elements.js';
// import { addRemoveListener } from '../util.js';

// const TYPES_FILE = ['jpg', 'jpeg', 'png'];

// const uploadFile = () => {
//   const file = uploadElement.files[0];
//   const fileName = file.name.toLowerCase();
//   const isCorrectTypeFile = TYPES_FILE.some((it) => fileName.endsWith(it));

//   if (isCorrectTypeFile) {
//     const imageFromUrl = URL.createObjectURL(file);
//     effectElement.forEach((el) => {
//       el.style.backgroundImage = `url(${imageFromUrl})`;
//     });
//     previewElement.src = imageFromUrl;
//   }
// };

// addRemoveListener('change', 'onChange', uploadElement, uploadFile);
