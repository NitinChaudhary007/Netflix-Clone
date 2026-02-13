import React from "react";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Body from "./components/Body";

export default function App() {
  return (
    <div>
      <Body />
      <Toaster />
    </div>
  );
}
