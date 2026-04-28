import { state } from './converter-state.js';
import { showLog, clearLog, log } from './converter-log.js';
import { resetSteps, setStep } from './converter-steps.js';

function loadFile(file){
  state.selectedFile = file;
  const ext = file.name.split('.').pop().toLowerCase();
  const dz = document.getElementById('dropzone');
  dz.querySelector('.drop-title').textContent = file.name;
  dz.querySelector('.drop-sub').textContent = `${(file.size/1024).toFixed(1)} KB · ${ext.toUpperCase()} file loaded`;
  dz.querySelector('.drop-icon').textContent = ext === 'rar' ? '📦' : '🗜️';
  document.getElementById('convertBtn').classList.add('visible');
  showLog(); clearLog();
  log(`📦 Loaded: ${file.name}`, 'info');
  log(`→ Pipeline: ${ext.toUpperCase()} → ${ext === 'rar' ? 'ZIP → APK' : 'APK'}`, 'info');
  resetSteps(); setStep(ext === 'rar' ? 'rar' : 'zip', 'active');
}

export function initDnD(){
  const drop = document.getElementById('dropzone');
  const input = document.getElementById('fileInput');
  drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('dragging'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('dragging'));
  drop.addEventListener('drop', e => { e.preventDefault(); drop.classList.remove('dragging'); const f = e.dataTransfer.files[0]; if (f) loadFile(f); });
  input.addEventListener('change', e => { const f = e.target.files[0]; if (f) loadFile(f); });
}
