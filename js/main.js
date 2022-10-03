/* Функция, возвращающая случайное целое число из переданного диапазона включительно.
источник -MDN */

function getRandomIntegerNumber(min, max) {
  min = Math.ceil(min); //округлят в меньшую сторону минимальное значение
  max = Math.floor(max); //округляет в большую сторону максимальное значение
  return Math.floor(Math.random() * (max - min + 1)) + min; //возвращает рандом. число
}

getRandomIntegerNumber(1, 45); //вызываем функцию

/* Функция для проверки максимальной длины строки (тз - длинна комментария небольше 140 символов) */

function checkStringLength(string, maxlength) {
  if (string.length <= maxlength) {
    return true;
  }
  // console.log('Комментарий слишком длинный');
  return false;
}

checkStringLength(50, 140);
