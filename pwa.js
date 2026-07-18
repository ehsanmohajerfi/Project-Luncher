(() => {
  'use strict';
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));

  const offer = document.getElementById('pwa-offer');
  const installButton = document.getElementById('pwa-install');
  const dismissButton = document.getElementById('pwa-dismiss');
  const message = document.getElementById('pwa-message');
  if (!offer || !installButton || !dismissButton || !message) return;

  let installPrompt = null;
  const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const showOffer = () => {
    if (!standalone && sessionStorage.getItem('pwaOfferDismissed') !== 'true') offer.hidden = false;
  };

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    showOffer();
  });
  if (isIos && !standalone) {
    installButton.textContent = 'How to install';
    showOffer();
  }

  installButton.addEventListener('click', async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      offer.hidden = true;
      return;
    }
    message.textContent = 'On iPhone or iPad: tap Share, then choose Add to Home Screen.';
  });
  dismissButton.addEventListener('click', () => {
    offer.hidden = true;
    sessionStorage.setItem('pwaOfferDismissed', 'true');
  });
  window.addEventListener('appinstalled', () => {
    offer.hidden = true;
    installPrompt = null;
  });
})();
