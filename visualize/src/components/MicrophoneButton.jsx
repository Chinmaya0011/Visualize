// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { TranscriptionContext } from "../context/TranscriptionContext";

const MicrophoneButton = () => {
  const { startRecording, stopRecording, isRecording } = useContext(TranscriptionContext);
  const [buttonText, setButtonText] = useState("Start Recording");

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
      setButtonText("Start Recording");
    } else {
      startRecording();
      setButtonText("Stop Recording");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`btn ${isRecording ? "bg-red-500" : "bg-green-500"} text-white py-2 px-4 rounded`}
    >
      {buttonText}
    </button>
  );
};

export default MicrophoneButton;
