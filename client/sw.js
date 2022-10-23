if ((appConfig.pwa == 'true') && 'serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register(`${appConfig.root}service-worker.js`);
  });
}