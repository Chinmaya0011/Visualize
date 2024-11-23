// eslint-disable-next-line no-unused-vars
import React from "react";
import HistoryList from "../components/HistoryList";

const HistoryPage = () => {
  return (
    <div className="history-page">
      <h2 className="text-3xl font-bold mb-4">Transcription History</h2>
      <HistoryList />
    </div>
  );
};

export default HistoryPage;
