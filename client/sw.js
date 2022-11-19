import {Workbox} from 'workbox-window';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

if ((window.appConfig.pwa == 'true') && 'serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    const wb = new Workbox(`${window.appConfig.root}service-worker.js`);

    const showSkipWaitingPrompt = async () => {
      wb.addEventListener('controlling', () => window.location.reload());
      if (await updateAccepted()) wb.messageSkipWaiting();
    };

    wb.addEventListener('waiting', () => showSkipWaitingPrompt());
    wb.register();
  });
}

function updateAccepted() {
  return new Promise(
    (resolve, reject) => {
      let toast = Toastify({
        duration: -1,
        gravity: "top",
        position: "center",
        className: 'sw-update-msg',
        node: Object.assign(
          document.createElement('span'), {
            innerHTML: `New version available <button data-update="1">Refresh</button> <button data-update="0">Dismiss</button>`,
            onclick: event => {
              let update = event.target.getAttribute('data-update');
              if (!update) return;
              if (update == '1') resolve(true);
              if (update == '0') resolve(false);
              toast.hideToast();
            }
          }
        )
      });

      toast.showToast();
    }
  );
}