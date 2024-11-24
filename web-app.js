// Variável para armazenar o evento beforeinstallprompt
let installPromptEvent;
let deferredPrompt;

// Evento beforeinstallprompt para detectar a possibilidade de instalação do PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Impede que o prompt padrão apareça
  event.preventDefault();

  // Salva o evento para ser acionado manualmente mais tarde
  installPromptEvent = event;
  deferredPrompt = event; // Para a segunda parte do código

  // Exibe o botão de instalação (com id="install")
  const installSection = document.getElementById('install');
  if (installSection) {
    installSection.style.display = 'block';
  }

  // Adiciona o comportamento de clique ao botão de instalação
  const installButton = document.getElementById('install');
  if (installButton) {
    installButton.addEventListener('click', () => {
      // Mostra o prompt de instalação quando o botão é clicado
      installPromptEvent.prompt();

      // Aguarda a resposta do usuário (aceitar ou recusar a instalação)
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação.');
        } else {
          console.log('Usuário recusou a instalação.');
        }
        // Após a escolha do usuário, o botão de instalação não é ocultado
      });
    });
  }
});

// Bloquear o "pull-to-refresh" apenas no PWA
document.addEventListener('touchmove', function(event) {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

  // Impedir o pull-to-refresh quando estiver no topo da página, mas apenas no PWA
  if (isStandalone && window.scrollY === 0 && event.touches[0].clientY > 0) {
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