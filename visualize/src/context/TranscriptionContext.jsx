// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const TranscriptionContext = createContext();

// eslint-disable-next-line react/prop-types
const TranscriptionProvider = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Your Deepgram API key
  const DEEPGRAM_API_KEY = '28efb2fe-e3f1-499e-acd5-4c870bc329e7';

  // Start recording
  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          audioChunksRef.current = []; // Clear chunks for the next recording
          sendAudioToDeepgram(audioBlob); // Send to Deepgram for transcription
        };

        mediaRecorderRef.current.start();
      })
      .catch((err) => {
        console.error('Error accessing microphone:', err);
        setErrorMessage('Error accessing microphone');
      });
  };

  // Stop recording
  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  // Send audio to Deepgram for transcription
  const sendAudioToDeepgram = async (audioBlob) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');

    try {
      const response = await axios.post('https://api.deepgram.com/v1/listen', formData, {
        headers: {
          'Authorization': `Bearer ${DEEPGRAM_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const transcript = response.data.results.channels[0].alternatives[0].transcript;
      setTranscription(transcript);
    } catch (error) {
      console.error('Error during transcription:', error);
      setErrorMessage('Error during transcription');
    } finally {
      setIsLoading(false);
    }
  };

  // Save transcription to history
  const saveTranscription = () => {
    if (transcription) {
      setHistory((prevHistory) => [...prevHistory, transcription]);
      setTranscription('');
    }
  };

  // Delete transcription from history
  const deleteTranscription = (index) => {
    setHistory((prevHistory) => prevHistory.filter((_, idx) => idx !== index));
  };

  // Load saved history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(savedHistory);
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  return (
    <TranscriptionContext.Provider value={{
      isRecording,
      transcription,
      history,
      isLoading,
      errorMessage,
      startRecording,
      stopRecording,
      saveTranscription,
      deleteTranscription,
    }}>
      {children}
    </TranscriptionContext.Provider>
  );
};

export default TranscriptionProvider;
