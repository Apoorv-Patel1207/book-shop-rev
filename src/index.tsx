import React from "react";
import ReactDOM from "react-dom/client"; // React 18+ uses react-dom/client
import App from "./App";

// Ensure root element is not null
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
