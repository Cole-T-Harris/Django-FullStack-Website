import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./static/styles.scss"

const root = createRoot(document.getElementById("app"));
root.render(<App />);