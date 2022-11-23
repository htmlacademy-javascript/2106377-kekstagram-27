import './create-photos.js';
import './thumbnails.js';
import './full-photo.js';
import './form.js';
import './form-valid.js';
import './Uploading-photo.js';
import {closeFormImage} from './form.js';
import {setImageFormSubmit} from './form-valid.js';
import {renderThumbnails, setFilterClick} from './thumbnails.js';
import {getData} from './api.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  renderThumbnails(photos);
  setFilterClick(debounce(
    (button) => renderThumbnails(photos, button),
    RERENDER_DELAY,
  ));
});

setImageFormSubmit(closeFormImage);
