document.getElementById('toggleBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const sidebar = document.getElementById('gravity-sidebar-root');
      if (sidebar) {
        window.__gravitySidebar?.toggle();
      }
    }
  });
  window.close();
});

// Reflect sidebar state
chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
  if (!tab) return;
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.__gravitySidebar?.isOpen() ?? false
    });
    if (results?.[0]?.result) {
      document.getElementById('toggleBtn').classList.add('active');
    }
  } catch (_) {}
});
