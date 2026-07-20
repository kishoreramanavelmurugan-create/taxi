// Client API configuration.
// For local development, this defaults to localhost.
// For production, set the global window.API_BASE_URL before loading the app scripts,
// or replace this placeholder during deployment.
(function () {
  const params = new URLSearchParams(window.location.search);
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const isFileProtocol = window.location.protocol === "file:";
  const defaultApiUrl =
    isLocalhost || isFileProtocol
      ? "http://localhost:3000"
      : "https://taxi-1-kvpm.onrender.com";

  const runtimeApiUrl =
    window.API_BASE_URL ||
    window.__ENV__?.API_BASE_URL ||
    window.__RUNTIME_CONFIG__?.API_BASE_URL ||
    params.get("apiBaseUrl") ||
    defaultApiUrl;

  window.API_BASE_URL = runtimeApiUrl;
})();
