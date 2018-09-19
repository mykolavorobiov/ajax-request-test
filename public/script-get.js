
scriptRequest = {
  name: 'script-jsonp',
  req: () => {
    return new Promise((resolve, reject) => {
      window.test = function(data) {
         scriptOk = true;
         resolve(data);
       };
       const callbackName = 'test';
         const url = 'https://www.mocky.io/v2/5b996d4b320000900013fd6c?callback=' + callbackName;
       let scriptOk = false;
       const script = document.createElement('script');
       const checkCallback = () => {
         if (scriptOk) return;
         reject('script get error: ' + url);
       }
       script.onreadystatechange = function() {
         if (this.readyState == 'complete' || this.readyState == 'loaded') {
           this.onreadystatechange = null;
           setTimeout(checkCallback, 0);
         }
       }
       script.onload = script.onerror = checkCallback;
       script.src = url;
   
       document.body.appendChild(script);
    })
   }
}