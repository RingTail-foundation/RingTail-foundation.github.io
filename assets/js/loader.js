export async function mountPartials(partials){
  for (const [mountId, path] of partials){
    const mount = document.getElementById(mountId);
    if(!mount) continue;
    const res = await fetch(path);
    mount.innerHTML = await res.text();
  }
}
