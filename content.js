// Gravity Tools — Content Script
// Injects the sidebar iframe and controls its visibility

(function () {
  if (document.getElementById('gravity-sidebar-root')) return;

  let open = false;

  // Create container
  const root = document.createElement('div');
  root.id = 'gravity-sidebar-root';
  document.body.appendChild(root);

  // Create iframe pointing to the sidebar app
  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('sidebar.html');
  iframe.allow = 'clipboard-read; clipboard-write';
  root.appendChild(iframe);

  // Public API
  window.__gravitySidebar = {
    toggle() {
      open = !open;
      root.classList.toggle('gravity-open', open);
      document.body.classList.toggle('gravity-shifted', open);
    },
    open() {
      open = true;
      root.classList.add('gravity-open');
      document.body.classList.add('gravity-shifted');
    },
    close() {
      open = false;
      root.classList.remove('gravity-open');
      document.body.classList.remove('gravity-shifted');
    },
    isOpen() { return open; }
  };

  // Keyboard shortcut: Alt + G
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'g') {
      e.preventDefault();
      window.__gravitySidebar.toggle();
    }
  });

  // Listen for close message from iframe
  window.addEventListener('message', (e) => {
    if (e.data === 'gravity:close') {
      window.__gravitySidebar.close();
    }
  });
})();
