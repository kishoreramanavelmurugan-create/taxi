// Client API configuration.
// Local development defaults to localhost.
// Production can override this via a global variable or by editing this file.
(function () {
  const runtimeApiUrl =
    window.API_BASE_URL ||
    window.__ENV__?.API_BASE_URL ||
    window.__RUNTIME_CONFIG__?.API_BASE_URL ||
    new URLSearchParams(window.location.search).get("apiBaseUrl") ||
    "http://localhost:3000";

  window.API_BASE_URL = runtimeApiUrl;
})();
