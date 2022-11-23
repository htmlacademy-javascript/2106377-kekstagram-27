// загрузка фотографии
const TYPES_OF_FILES = ['jpg', 'jpeg', 'png'];//массив для ограничения выбора файла - картинка

const inputUploadingImage = document.querySelector('#upload-file'); //input для загрузки изображения и формы
const uploadPreviewContainer = document.querySelector('.img-upload__preview');
const uploadPreviewImg = uploadPreviewContainer.querySelector('img'); //картинка внутри .img-upload__preview

inputUploadingImage.addEventListener('change', () => {
  const file = inputUploadingImage.files[0];//в свойстве files хранится список(даже из одного файла) ->файл получить по индексу 0
  const fileName = file.name.toLowerCase();//название файла в строчных буквах(метод) toLowerCase()
  const matches = TYPES_OF_FILES.some((it) => fileName.endsWith(it));// some() по массиву -проверка, оканчивается ли название файла на него->true/false
  if (matches) {
    uploadPreviewImg.src = URL.createObjectURL(file);
  }
});
