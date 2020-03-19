const writeEvent = (text) => {
  document.getElementById("Text").innerHTML = text;
};

const sock = io();

const onFormSubmitted = (e) => {
    e.preventDefault();
  
    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';
  
    sock.emit('message', text);
};

const onButtonTimer = (e) => {
  e.preventDefault();
  
  sock.emit('Timer');
}

function TimerStart(){
  var countDownDate = new Date();
  countDownDate.setSeconds(countDownDate.getSeconds() + 10);
  document.getElementById('start').style.visibility = 'hidden';

  var x = setInterval(function() {
      var now = new Date().getTime();
        
      var distance = countDownDate - now;
        
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
      document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
        
      if (distance < 0) {
        clearInterval(x);
        sock.emit('Random');
        document.getElementById('start').style.visibility = 'visible';
        document.getElementById("demo").innerHTML = "Starte Counter Neu";
      }
    }, 1000); 
}

sock.on('message', writeEvent);
sock.on('timer', TimerStart);

document.querySelector('#starttime').addEventListener('submit', onButtonTimer);
