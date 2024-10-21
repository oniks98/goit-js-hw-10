import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', createMessage);

function createMessage(event) {
  event.preventDefault();

  const delay = +event.target.elements.delay.value;
  const statePromise = event.target.elements.state.value;

  makePromise(delay, statePromise)
    .then(мessageFulfilled)
    .catch(мessageRejected);
}

function makePromise(delay, statePromise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (statePromise === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function мessageFulfilled(delay) {
  iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    messageColor: 'white',
    messageSize: '18',
    backgroundColor: 'green',
    position: 'topCenter',
    timeout: 3000,
  });
}

function мessageRejected(delay) {
  iziToast.show({
    message: `❌ Rejected promise in ${delay}ms`,
    messageColor: 'white',
    messageSize: '18',
    backgroundColor: 'red',
    position: 'topCenter',
    timeout: 3000,
  });
}
