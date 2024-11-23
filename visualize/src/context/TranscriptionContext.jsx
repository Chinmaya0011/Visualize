import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// Create a React context for transcription
const TranscriptionContext = React.createContext();

const TranscriptionProvider = ({ children }) => {
  const [transcription, setTranscription] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  
  useEffect(() => {
    // Cleanup function to stop recording if the component unmounts
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);
  
  const startRecording = async () => {
    if (navigator.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        
        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          await sendAudioToDeepgram(audioBlob);
        };
        
        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error starting recording: ", error);
      }
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const sendAudioToDeepgram = async (audioBlob) => {
    const apiKey = "9d873ece6a7fe33fa99193be598045ba3d146350";

    if (!apiKey) {
      console.error("Deepgram API key is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioBlob);

    try {
      const response = await axios.post(
        "https://api.deepgram.com/v1/listen",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log("Transcription response:", response.data);
      setTranscription(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error during transcription:", error.response.data);
      } else {
        console.error("Network error:", error.message);
      }
    }
  };

  return (
    <TranscriptionContext.Provider value={{ transcription, startRecording, stopRecording, isRecording }}>
      {children}
    </TranscriptionContext.Provider>
  );
};

const useTranscription = () => {
  return React.useContext(TranscriptionContext);
};

export { TranscriptionProvider, useTranscription };
