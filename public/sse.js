var eventSource;
function start() {
  if (!window.EventSource) {
    return;
  }
  eventSource = new EventSource('sse');
  eventSource.onopen = function(e) {
    console.log('open', e);
  };
  eventSource.onerror = function(e) {
    console.log(this.readyState);
    stop();
  };
  eventSource.addEventListener('end', function(e) {
    console.log('end event: ', e.data);
  }, false);

  eventSource.onmessage = function(e) {
    console.log('msg: ', e);
    console.log(e.data);
  };
}
start();

function stop() {
  eventSource.close();
  console.log('close');
}

function log(msg) {
  logElem.innerHTML += msg + '<br>';
}