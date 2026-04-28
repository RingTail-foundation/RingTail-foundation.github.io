import { showLog, log } from './converter-log.js';

export function initDownload(){
  window.triggerDownload = function(platform, version){
    const filename = `vservo.${version}.rar`;
    const url = `https://github.com/RingTail-foundation/RingTail-foundation.github.io/releases/download/v${version}/${filename}`;
    log('⬇ Redirecting to GitHub release...', 'info');
    showLog();
    window.open(url, '_blank', 'noopener,noreferrer');
    document.getElementById('converter-mount')?.scrollIntoView({ behavior: 'smooth' });
  }
}
