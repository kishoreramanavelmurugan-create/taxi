// Client API configuration.
// Local development defaults to localhost.
// Production can override this via a global variable or by editing this file.
(function () {
  const params = new URLSearchParams(window.location.search);
  const runtimeApiUrl =
    window.API_BASE_URL ||
    window.__ENV__?.API_BASE_URL ||
    window.__RUNTIME_CONFIG__?.API_BASE_URL ||
    params.get("apiBaseUrl") ||
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:3000"
      : "https://your-render-backend-url.onrender.com");

  window.API_BASE_URL = runtimeApiUrl;
})();
