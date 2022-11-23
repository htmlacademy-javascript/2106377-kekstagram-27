// загрузка фотографии
const TYPES_OF_FILES = ['jpg', 'jpeg', 'png'];

const inputUploadingImage = document.querySelector('#upload-file');
const uploadPreviewContainer = document.querySelector('.img-upload__preview');
const uploadPreviewImg = uploadPreviewContainer.querySelector('img');

inputUploadingImage.addEventListener('change', () => {
  const file = inputUploadingImage.files[0];
  const fileName = file.name.toLowerCase();
  const matches = TYPES_OF_FILES.some((it) => fileName.endsWith(it));
  if (matches) {
    uploadPreviewImg.src = URL.createObjectURL(file);
  }
});
