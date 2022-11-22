const ALERT_SHOW_TIME = 400000;
function getRandomPositiveInteger(min, max) {
  if (min < 0 && max < 0) {
    return NaN;
  }
  const firstNum = Math.ceil(min);
  const lastNum = Math.floor(max);
  const result = Math.floor(Math.random() * (lastNum - firstNum + 1)) + firstNum;
  return result;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '150px';
  alertContainer.style.top = '10px';
  alertContainer.style.right = '150px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'rgb(255, 135, 0)';
  alertContainer.style.textTransform = 'none';
  alertContainer.style.borderColor = 'rgb(255, 135, 0)';
  alertContainer.style.border = '2px';
  alertContainer.style.borderRadius = '15px';
  alertContainer.style.borderStyle = 'solid';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export{getRandomPositiveInteger, isEscapeKey, showAlert};
