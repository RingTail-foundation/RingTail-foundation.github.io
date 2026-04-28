export const delay = ms => new Promise(r => setTimeout(r, ms));

export function readFileBytes(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function packAsZip(arrayBuffer, innerFileName){
  return new Promise((resolve, reject) => {
    try {
      const uint8 = new Uint8Array(arrayBuffer);
      const files = {};
      files[innerFileName] = uint8;
      fflate.zip(files, { level: 6 }, (err, data) => err ? reject(err) : resolve(data));
    } catch (e) { reject(e); }
  });
}

export function downloadBlob(blob, name){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
