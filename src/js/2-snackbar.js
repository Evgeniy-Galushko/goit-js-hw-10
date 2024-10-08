import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import oks from '../img/bi_check2-circle.svg';
import err from '../img/bi_x-octagon.svg';

const form = document.querySelector('.form');

function enteredTime(event) {
  event.preventDefault();
  const data = event.target;
  const time = data.elements.delay.value;
  const promiseState = data.elements.state.value;
  console.log({ time: `${time}`, radio: `${promiseState}` });
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, time);
  });
  promise.then(value => {
    iziToast.warning({
      backgroundColor: '#59A10D',
      position: 'center',
      title: ' OK',
      iconUrl: oks,
      message: `✅ Fulfilled promise in ${time} ms`,
    });
  });
  promise.catch(error => {
    iziToast.warning({
      backgroundColor: '#EF4040',
      position: 'center',
      title: 'Error',
      iconUrl: err,
      message: `❌ Rejected promise in ${time} ms`,
    });
  });
  console.log(promise);
  form.reset();
}

form.addEventListener('submit', enteredTime);
