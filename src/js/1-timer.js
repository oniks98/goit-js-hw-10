import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const button = document.querySelector('button');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const dataInput = document.querySelector('#datetime-picker');

button.addEventListener('click', startTimer);
button.disabled = true;

const options = {
  enableTime: true, //Включает выбор времени
  time_24hr: true, //При включении отображает выбор времени в 24-часовом режиме без выбора AM/PM.
  defaultDate: new Date(), //String null Устанавливает начальные выбранные даты.Если вы используете режим: "multiple" или диапазонный календарь, укажите массив объектов Date или массив строк дат, которые соответствуют вашему dateFormat.В противном случае вы можете указать один объект Date или date string.
  minuteIncrement: 1, //Integer(Целое число) 5; Регулирует шаг ввода минут (включая прокрутку)
  onClose(selectedDates) {
    const currentTime = Date.now();
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0].getTime();

    if (userSelectedDate < currentTime) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: 'white',
        messageSize: '18',
        backgroundColor: 'red',
        position: 'topCenter',
        timeout: 3000,
      });
      button.disabled = true; // Вимкнути кнопку, якщо дата минула
    } else {
      button.disabled = false; // Активувати кнопку, якщо дата майбутня
    }
  }, // Function, [functions]	null	Function(s) для срабатывания каждый раз при закрытии календаря. См. API событий https://flatpickr.js.org/events/#onclose
  dateFormat: 'Y-m-d H:i:S', //Строка символов, которая используется для определения того, как дата будет отображаться в поле ввода.
  enableSeconds: true, //Включает секунды в средстве выбора времени.
  allowInput: true, //Позволяет пользователю вводить дату непосредственно в поле ввода.
};

flatpickr(dataInput, options);

function startTimer() {
  button.disabled = true;
  dataInput.disabled = true;

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const ms = userSelectedDate - currentTime;

    if (ms <= 0) {
      clearInterval(intervalId);
      iziToast.show({
        message: 'Time is up!',
        messageColor: 'white',
        messageSize: '18',
        backgroundColor: 'red',
        position: 'topCenter',
        timeout: 6000,
      });
      dataInput.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(ms);

    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
