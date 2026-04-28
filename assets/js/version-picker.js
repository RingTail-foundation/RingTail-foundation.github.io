export function initVersionPicker(){
  window.togglePicker = function(panelId, btn){
    const panel = document.getElementById(panelId);
    const allPanels = document.querySelectorAll('.version-panel');
    const allBtns = document.querySelectorAll('.version-picker-btn');
    allPanels.forEach(p => { if (p.id !== panelId) p.classList.remove('open'); });
    allBtns.forEach(b => { if (b !== btn) b.classList.remove('open'); });
    panel.classList.toggle('open');
    btn.classList.toggle('open');
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('.download-card')) {
      document.querySelectorAll('.version-panel').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('.version-picker-btn').forEach(b => b.classList.remove('open'));
    }
  });
}
