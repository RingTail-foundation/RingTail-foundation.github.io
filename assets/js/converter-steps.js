export function resetSteps(){
  ['step-rar','step-extract','step-zip','step-apk'].forEach(id => document.getElementById(id)?.classList.remove('active','done'));
}

export function setStep(stepName, state){
  const map = { rar: 'step-rar', extract: 'step-extract', zip: 'step-zip', apk: 'step-apk' };
  const el = document.getElementById(map[stepName]);
  if (!el) return;
  el.classList.remove('active','done');
  if (state) el.classList.add(state);
}
