// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from "react";
import { TranscriptionContext } from "../context/TranscriptionContext";

const MicrophoneButton = () => {
  const { startRecording, stopRecording, isRecording } = useContext(TranscriptionContext);
  const [buttonText, setButtonText] = useState("Start Recording");

  useEffect(() => {
    // Update the button text whenever the recording state changes
    if (isRecording) {
      setButtonText("Stop Recording");
    } else {
      setButtonText("Start Recording");
    }
  }, [isRecording]);

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
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
