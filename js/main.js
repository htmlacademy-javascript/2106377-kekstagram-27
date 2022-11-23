import './create-photos.js';
import './thumbnails.js';
import './full-photo.js';
import './form.js';
import './form-valid.js';
import './Uploading-photo.js';
import {closeFormImage} from './form.js';
import {setImageFormSubmit} from './form-valid.js';
import {renderThumbnails, setDefaultClick, setRandomClick, setDiscussedClick} from './thumbnails.js';
import {getData} from './api.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  renderThumbnails(photos);
  setDefaultClick(debounce(
    () => renderThumbnails(photos),
    RERENDER_DELAY,
  ));
  setRandomClick(debounce(
    () => renderThumbnails(photos),
    RERENDER_DELAY,
  ));
  setDiscussedClick(debounce(
    () => renderThumbnails(photos),
    RERENDER_DELAY,
  ));
});

setImageFormSubmit(closeFormImage);
