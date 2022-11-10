if ((window.appConfig.pwa == 'true') && 'serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register(`${window.appConfig.root}service-worker.js`);
  });
}