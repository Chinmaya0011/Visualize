// eslint-disable-next-line no-unused-vars
import React from "react";
import MicrophoneButton from "../components/MicrophoneButton";
import TranscriptionDisplay from "../components/TranscriptionDisplay";
import SaveButton from "../components/SaveButton";

const HomePage = () => {
  return (
    <div className="home-page">
      <h2 className="text-3xl font-bold mb-4">Welcome to Vocalize</h2>
      <MicrophoneButton />
      <TranscriptionDisplay />
      <SaveButton />
    </div>
  );
};

export default HomePage;
