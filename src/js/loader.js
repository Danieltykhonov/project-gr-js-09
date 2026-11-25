export function showLoader(container) {
  const loader = document.createElement('span');
  loader.className = 'loader';
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-label', 'Loading');
  container.append(loader);
  return loader;
}

export function hideLoader(loader) {
  loader?.remove();
}
