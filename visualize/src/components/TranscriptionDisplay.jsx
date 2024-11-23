// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { TranscriptionContext } from "../context/TranscriptionContext";

const TranscriptionDisplay = () => {
  const { transcription, isLoading, errorMessage } = useContext(TranscriptionContext);

  return (
    <div className="transcription-display my-4">
      {isLoading && <p className="text-gray-500">Transcribing...</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div>
        <h3 className="text-xl font-bold">Transcription:</h3>
        <p className="text-lg">{transcription}</p>
      </div>
    </div>
  );
};

export default TranscriptionDisplay;
