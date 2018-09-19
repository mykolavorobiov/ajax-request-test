const requests = [fetchRequest, iframeGet, scriptRequest];
const logDiv = document.getElementById('log');

for (let i = 0; i < requests.length; i++) {
  const button = document.createElement('button');
  button.innerHTML = requests[i].name;
  document.getElementById('buttons').appendChild(button);
  button.addEventListener('click', () => {
    requests[i].req.call(this).then(
      response => logDiv.innerHTML = JSON.stringify(response, null, 2),
      error => logDiv.innerHTML = error
    );
  });
}
