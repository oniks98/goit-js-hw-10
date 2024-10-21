import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
// const button = document.querySelector('button');
// const delay = document.querySelector('input[name="delay"]');

let valuePromise = null;
let delay = null;
let value = null;

form.addEventListener('submit', createNotification);

// function choosePromise(event) {

// }
// function createPromise(valuePromise) {}

function createNotification(event) {
  event.preventDefault();

  delay = event.target.elements.delay.value;

  if (event.target.elements.state.value === 'fulfilled') valuePromise = true;
  if (event.target.state.value === 'rejected') valuePromise = false;

  function makePromise({ value, delay, valuePromise }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (valuePromise) {
          value = iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            messageColor: 'white',
            messageSize: '18',
            backgroundColor: 'green',
            position: 'topCenter',
            timeout: 3000,
          });
        }
        if (!valuePromise) {
          value = iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            messageColor: 'white',
            messageSize: '18',
            backgroundColor: 'red',
            position: 'topCenter',
            timeout: 3000,
          });
        }

        if (valuePromise) {
          resolve(value);
        } else {
          reject(value);
        }
      }, delay);
    });
  }

  makePromise({ value, delay, valuePromise })
    .then(value => value)
    .catch(value => value);
}
