// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { TranscriptionContext } from "../context/TranscriptionContext";

const HistoryList = () => {
  const { history, deleteTranscription } = useContext(TranscriptionContext);

  return (
    <div className="history-list">
      <h2 className="text-xl font-bold">Saved Transcriptions</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((item, index) => (
            <li key={index} className="flex justify-between items-center my-2">
              <p className="text-lg">{item}</p>
              <button
                onClick={() => deleteTranscription(index)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved transcriptions.</p>
      )}
    </div>
  );
};

export default HistoryList;
