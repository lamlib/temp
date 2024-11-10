const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');


var myWorker;



function startWorker() {
  if (window.Worker) {
    if (!myWorker) {
        myWorker = new Worker("webworker.js");
    }

    [first, second].forEach(input => {
        input.onchange = function() {
          myWorker.postMessage([first.value, second.value]);
          console.log('Message posted to worker');
        }
    });

    myWorker.onmessage = function(e) {
        result.textContent = e.data;
        console.log('Message received from worker');
    }

  } else {
    console.log('Your browser doesn\'t support web workers.');
  }
}

function stopWorker() {
    myWorker.terminate();
    myWorker = undefined;
}