import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>{
      if (shouldResolve) {
        resolve(position, delay);
      } else {
        reject(position, delay);
      }
    }, delay);
  })
}

const refs = {
  clickBtn: document.querySelector('button'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.clickBtn.addEventListener('click', onSendForm);

function onSendForm (e){
  e.preventDefault();
  let valueDelay = Number(refs.delay.value);
  let valueAmount = Number(refs.amount.value);
  let valueStep = Number(refs.step.value);

  for (let position = 1; position <= valueAmount; position += 1){
    createPromise(position, valueDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    valueDelay += valueStep;
  })
}
}

