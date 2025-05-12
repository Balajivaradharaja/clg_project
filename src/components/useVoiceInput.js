// useVoiceInput.js
import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const useVoiceInput = () => {
  const [fields, setFields] = useState({
    customerName: '',
    medicineName: '',
    quantity: '',
    price: '',
    print_invoice:''
  });

  const commands = [
    {
      command: /customer name is (.*)/i,
      callback: (name) => setFields((prev) => ({ ...prev, customerName: name.trim() })),
    },
    {
      command: /medicine is (.*)/i,
      callback: (med) => setFields((prev) => ({ ...prev, medicineName: med.trim() })),
    },
    {
      command: /quantity is (\d+)/i,
      callback: (qty) => setFields((prev) => ({ ...prev, quantity: parseInt(qty, 10) })),
    },
    {
      command: /price is (\d+)/i,
      callback: (price) => setFields((prev) => ({ ...prev, price: parseFloat(price) })),
    },
    {
        command:"print Invoice ",
        callback: () => {
            console.log("Invoice printed successfully!");
            alert("Invoice printed successfully!");
        }
    }
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  };
  const stopListening = () => {
    SpeechRecognition.stopListening();
  }
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error("❌ Browser doesn't support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  return {
    fields,
    transcript,
    listening,
    startListening,
    stopListening,
  };
};

export default useVoiceInput;


