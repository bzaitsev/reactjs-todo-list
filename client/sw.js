import {Workbox} from 'workbox-window';

if ((window.appConfig.pwa == 'true') && 'serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    const wb = new Workbox(`${window.appConfig.root}service-worker.js`);

    const showSkipWaitingPrompt = async () => {
      wb.addEventListener('controlling', () => {
        window.location.reload();
      });
  
      const updateAccepted = await confirm();
  
      if (updateAccepted) {
        wb.messageSkipWaiting();
      }
    };

    wb.addEventListener('waiting', () => {
      showSkipWaitingPrompt();
    });

    wb.register();
  });
}