export function showLoader(container) {
  const loader = document.createElement('span');
  loader.className = 'loader';
  loader.setAttribute('role', 'status');
  container.append(loader);
  return loader;
}

export function hideLoader(loader) {
  loader?.remove();
}