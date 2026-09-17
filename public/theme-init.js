// Run before paint: light is the default, regardless of the device's appearance.
(function () {
  var theme = 'light';
  try { if (localStorage.getItem('adelvio-theme') === 'dark') theme = 'dark'; } catch { /* Storage is optional. */ }
  document.documentElement.dataset.theme = theme;
})();
