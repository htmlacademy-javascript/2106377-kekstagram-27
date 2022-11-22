import './create-photos.js';
import './thumbnails.js';
import './full-photo.js';
import './form.js';
import './form-valid.js';
import {closeFormImage} from './form.js';
import {setImageFormSubmit} from './form-valid.js';
import {renderThumbnails} from './thumbnails.js';
import {getData} from './api.js';

getData((photos) => {
  renderThumbnails(photos);
});

setImageFormSubmit(closeFormImage);
