// Client API configuration.
// For local development, this defaults to localhost.
// For production, set the global window.API_BASE_URL before loading the app scripts,
// or replace this placeholder during deployment.
(function () {
  const params = new URLSearchParams(window.location.search);
  const runtimeApiUrl =
    window.API_BASE_URL ||
    window.__ENV__?.API_BASE_URL ||
    window.__RUNTIME_CONFIG__?.API_BASE_URL ||
    params.get("apiBaseUrl") ||
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:3000"
      : "REPLACE_WITH_RENDER_BACKEND_URL");

  window.API_BASE_URL = runtimeApiUrl;
})();
