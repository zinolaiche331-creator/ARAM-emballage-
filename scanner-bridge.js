// Offline fallback for Android WebViews that do not expose the BarcodeDetector API.
// The ZXing library is bundled locally, so scanning does not require internet access.
(function () {
  if ('BarcodeDetector' in window) return;
  window.BarcodeDetector = class BarcodeDetectorPolyfill {
    constructor(options = {}) {
      this.options = options;
      this.reader = new window.ZXingBrowser.BrowserMultiFormatReader();
      this.busy = false;
    }
    async detect(video) {
      if (this.busy || !video || video.readyState < 2) return [];
      this.busy = true;
      try {
        const result = await this.reader.decodeFromVideoElement(video);
        return result ? [{ rawValue: result.getText() }] : [];
      } catch (_) {
        return [];
      } finally {
        this.busy = false;
      }
    }
  };
})();
