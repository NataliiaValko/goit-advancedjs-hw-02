import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formPromisesRef = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const onFormPromisesSubmit = event => {
  event.preventDefault();

  const { amount, step, delay } = event.target.elements;
  const amountValue = Number(amount.value);
  const stepValue = Number(step.value);
  let delayValue = Number(delay.value);

  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, delayValue)
      .then(({ position, delay }) => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
          position: 'topRight',
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
          position: 'topRight',
        });
      });

    delayValue += stepValue;
  }
  event.target.reset();
};

formPromisesRef.addEventListener('submit', onFormPromisesSubmit);
