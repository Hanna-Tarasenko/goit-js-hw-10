import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const notificationForm = document.querySelector('.form');
notificationForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const inputDelay = parseInt(notificationForm.elements.delay.value);
  const promiseState = notificationForm.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      (promiseState === 'fulfilled' ? resolve : reject)(inputDelay);
    }, inputDelay);
  });

  promise
    .then(inputDelay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${inputDelay}ms`,
        position: 'topRight',
      });
    })
    .catch(inputDelay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${inputDelay}ms`,
        position: 'topRight',
      });
    })
    .finally(() => {
      notificationForm.elements.delay.value = '';
    });
});
