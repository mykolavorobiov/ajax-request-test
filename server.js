var express = require('express');
var app = new express();
var path = require('path');


var DATA = [{"id":"1","createdAt":"2018-09-08T09:55:41.739Z","name":"Alicia Rath","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/shvelo96/128.jpg"}];

app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendFile(path.resolve('./index.html'));
});

app.get('/iframe-get', function(request, res){
  res.end(wrap(DATA));
});

app.get('/sse', function(req, res, next){
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  var i = 0;
  var timer = setInterval(write, 1000);
  write();
  function write() {
    i++;
    if (i === 4) {
      res.write('event: end\ndata: na\n\n');
      clearInterval(timer);
      res.end();
      return;
    }
    res.write('data: ' + DATA);
  }
})
function wrap(data) {
  return '<script>parent.CallbackRegistry[window.name](' + JSON.stringify(data) + ')</script>';
}

if (!module.parent) {
  app.listen(3333, function() {
    console.log('3333 port')
  });
} else {
  exports.accept = accept;
}