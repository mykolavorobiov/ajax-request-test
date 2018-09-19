const createIframe = (name, src, debug) => {
  src = src || 'javascript:false';
  const tmpElem = document.createElement('div');
  tmpElem.classList.add('iframe-hidden');
  tmpElem.innerHTML = `<iframe name="${name}" id="${name}" src="${src}">`;
  const iframe = tmpElem.firstChild;
  if (!debug) {
    iframe.style.display = 'none';
  }
  document.body.appendChild(iframe);
  return iframe;
}
window.CallbackRegistry = {};

iframeGet = {
  name: 'iframe-get',
  req: () => {
    return new Promise((resolve, reject) => {
      let iframeOk = false;
      const iframeName = 'frameName' + Math.random();
      const iframe = createIframe(iframeName, 'http://localhost:3333/iframe-get');
  
      CallbackRegistry[iframeName] = function(data) {
        iframeOk = true;
        resolve(data);
      }
  
      iframe.onload = function() {
        iframe.parentNode.removeChild(iframe);
        if (!iframeOk) reject('some error');
        delete CallbackRegistry[iframeName];
      }
    })
  }
}