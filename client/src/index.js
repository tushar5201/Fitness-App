import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

const renderApp = () => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
          <App />
    </React.StrictMode>
  );
};

// Ensure that the entire app is rendered when DOM content is fully loaded
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} else {
  renderApp();
}

// For hot module replacement (HMR) during development
if (module.hot) {
  module.hot.accept("./App", () => {
    setTimeout(renderApp);
  });
}
