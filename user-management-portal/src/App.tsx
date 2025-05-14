import React from "react";
import { HomePage } from "./components/HomePage/homePage";

function App() { 
  return (
    <React.StrictMode>
        <HomePage />
    </React.StrictMode>
  );
}

export default React.memo(App);