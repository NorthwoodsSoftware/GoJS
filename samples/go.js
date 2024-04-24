if (window.navigator.userAgent === 'PUPPET') {
  // used in buildTS/npm-scripts/jest.test.js
  document.write('<script src="../../out/go.js"></script>');
} else {
  document.write('<script src="../../out/go-dev.js"></script>');
}
