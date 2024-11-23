// eslint-disable-next-line no-unused-vars
import React from "react";
import TranscriptionProvider from "./context/TranscriptionContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <TranscriptionProvider>
      <AppRoutes />
    </TranscriptionProvider>
  );
};

export default App;
