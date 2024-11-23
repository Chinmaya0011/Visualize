// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { TranscriptionContext } from "../context/TranscriptionContext";

const SaveButton = () => {
  const { saveTranscription } = useContext(TranscriptionContext);

  return (
    <button
      onClick={saveTranscription}
      className="btn bg-blue-500 text-white py-2 px-4 rounded"
    >
      Save Transcription
    </button>
  );
};

export default SaveButton;
