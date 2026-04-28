import { state } from './converter-state.js';
import { showLog, clearLog, log } from './converter-log.js';
import { setStep } from './converter-steps.js';
import { delay, readFileBytes, packAsZip, downloadBlob } from './converter-helpers.js';

export function initRun(){
  const btn = document.getElementById('convertBtn');
  btn.addEventListener('click', async () => {
    if (!state.selectedFile) return;
    btn.disabled = true; btn.textContent = '⏳ Converting…';
    clearLog(); showLog();
    const ext = state.selectedFile.name.split('.').pop().toLowerCase();
    const baseName = state.selectedFile.name.replace(/\.(rar|zip)$/i, '');

    if (ext === 'rar' && (!window.fflate || typeof fflate.zip !== 'function')) {
      log('⚠ Compression library not available. Please retry after refreshing the page.', 'warn');
      btn.disabled = false; btn.textContent = '🔄 Convert to .apk'; return;
    }

    try {
      let zipBytes;
      if (ext === 'rar') {
        log('Step 1/3 — Reading .rar file…', 'info'); setStep('rar','active'); await delay(400);
        const rawBytes = await readFileBytes(state.selectedFile); log(`✓ Read ${rawBytes.byteLength} bytes`, 'ok'); setStep('rar','done');
        log('Step 2/3 — Repacking as .zip…', 'info'); setStep('extract','active'); await delay(500);
        zipBytes = await packAsZip(rawBytes, baseName + '.bin'); log(`✓ Packed into .zip (${(zipBytes.length/1024).toFixed(1)} KB)`, 'ok');
        setStep('extract','done'); setStep('zip','done');
      } else if (ext === 'zip') {
        log('Step 1/2 — Reading .zip file…', 'info'); setStep('zip','active'); await delay(350);
        zipBytes = new Uint8Array(await readFileBytes(state.selectedFile)); log(`✓ Read ${zipBytes.length} bytes`, 'ok'); setStep('zip','done');
      } else {
        log('⚠ Unsupported file type. Use .rar or .zip.', 'warn');
        btn.disabled = false; btn.textContent = '🔄 Convert to .apk'; return;
      }

      log('Step 3/3 — Renaming to .apk…', 'info'); setStep('apk','active'); await delay(500);
      const apkName = baseName + '.apk';
      downloadBlob(new Blob([zipBytes], { type: 'application/vnd.android.package-archive' }), apkName);
      setStep('apk','done'); log(`✓ Done! ${apkName} downloaded.`, 'ok');
      btn.textContent = '✓ Converted!';
      setTimeout(() => { btn.disabled = false; btn.textContent = '🔄 Convert another'; }, 2000);
    } catch (err) {
      log('✗ Error: ' + err.message, 'warn');
      btn.disabled = false; btn.textContent = '🔄 Try again';
    }
  });
}
