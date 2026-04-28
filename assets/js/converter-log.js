export function showLog(){ document.getElementById('convLog')?.classList.add('visible'); }
export function clearLog(){ const el = document.getElementById('convLog'); if (el) el.innerHTML = ''; }
export function log(msg, type = ''){
  const el = document.getElementById('convLog');
  if (!el) return;
  const line = document.createElement('div');
  line.className = 'log-line ' + type;
  const ts = new Date().toLocaleTimeString('en-GB', { hour12: false });
  line.textContent = `[${ts}] ${msg}`;
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}
