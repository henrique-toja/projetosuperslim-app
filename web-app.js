// Bloquear o "pull-to-refresh"
document.addEventListener('touchmove', function(event) {
  // Impedir o pull-to-refresh quando estiver no topo da página
  if (window.scrollY === 0 && event.touches[0].clientY > 0) {
    event.preventDefault(); // Bloqueia o refresh
  }
}, { passive: false });

// Registrar o Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => {
      console.log('Service Worker registrado com sucesso.');
    })
    .catch((error) => {
      console.error('Falha ao registrar o Service Worker:', error);
    });
}

// Lógica para exibir o prompt de instalação do PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevenir o prompt padrão do navegador
  e.preventDefault();
  deferredPrompt = e;

  // Criar e exibir o botão de instalação
  const installButton = document.createElement('button');
  installButton.textContent = 'Instalar o App';
  installButton.style.position = 'fixed';
  installButton.style.bottom = '10px';
  installButton.style.right = '10px';
  document.body.appendChild(installButton);

  // Lidar com a ação do usuário no botão de instalação
  installButton.addEventListener('click', () => {
    deferredPrompt.prompt(); // Exibir o prompt para instalação
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou instalar o app.');
      } else {
        console.log('Usuário recusou instalar o app.');
      }
      // Limpar variáveis e remover o botão
      deferredPrompt = null;
      installButton.remove();
    });
  });
});