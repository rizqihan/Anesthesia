'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '@/store/appStore';
import { parseVoiceIntent, ParsedVoiceIntent } from '@/lib/voiceIntentParser';

export interface UseVoiceLookupReturn {
  isListening: boolean;
  isSupported: boolean;
  isSpeaking: boolean;
  transcript: string;
  interimTranscript: string;
  matchedIntent: ParsedVoiceIntent | null;
  error: string | null;
  continuousScrubMode: boolean;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
  setContinuousScrubMode: (enabled: boolean) => void;
  speak: (text?: string) => void;
  cancelSpeech: () => void;
  processQuery: (queryText: string) => ParsedVoiceIntent;
  clearTranscript: () => void;
}

export function useVoiceLookup(): UseVoiceLookupReturn {
  const { language, activeCase } = useAppStore();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [matchedIntent, setMatchedIntent] = useState<ParsedVoiceIntent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [continuousScrubMode, setContinuousScrubMode] = useState(false);

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);
  const continuousRef = useRef(continuousScrubMode);
  continuousRef.current = continuousScrubMode;

  const activeWeight = parseFloat(activeCase.patientWeight) || 70;

  // Check Web Speech API support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
      }
    }
  }, []);

  // Process text query into clinical intent
  const processQuery = useCallback(
    (queryText: string): ParsedVoiceIntent => {
      const intent = parseVoiceIntent(queryText, activeWeight, language);
      setTranscript(queryText);
      setMatchedIntent(intent);
      return intent;
    },
    [activeWeight, language]
  );

  // Text to Speech (TTS)
  const cancelSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(
    (textToSpeak?: string) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;

      const text =
        textToSpeak ||
        (matchedIntent
          ? language === 'en'
            ? matchedIntent.speakTextEn
            : matchedIntent.speakTextId
          : '');

      if (!text) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [language, matchedIntent]
  );

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListeningRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop error
      }
    }
    isListeningRef.current = false;
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setError(
        language === 'en'
          ? 'Web Speech API is not supported in this browser. Please use Google Chrome, Edge, or enter text below.'
          : 'Web Speech API tidak didukung di browser ini. Gunakan Google Chrome, Edge, atau ketik teks di bawah.'
      );
      return;
    }

    // Stop existing instance if running
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // Ignore
      }
    }

    setError(null);
    setInterimTranscript('');

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = continuousRef.current;
      recognition.interimResults = true;
      recognition.lang = language === 'en' ? 'en-US' : 'id-ID';

      recognition.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let finalized = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalized += item[0].transcript;
          } else {
            interim += item[0].transcript;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
        }

        if (finalized) {
          setInterimTranscript('');
          const trimmed = finalized.trim();
          if (trimmed) {
            const intent = processQuery(trimmed);
            // In continuous scrub mode, speak confirmation automatically
            if (continuousRef.current) {
              const speakText = language === 'en' ? intent.speakTextEn : intent.speakTextId;
              speak(speakText);
            }
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError(
            language === 'en'
              ? 'Microphone permission denied. Please allow microphone access in browser settings.'
              : 'Izin mikrofon ditolak. Izinkan akses mikrofon di pengaturan browser.'
          );
        } else if (event.error !== 'no-speech') {
          setError(`Voice input error: ${event.error}`);
        }
        isListeningRef.current = false;
        setIsListening(false);
      };

      recognition.onend = () => {
        if (continuousRef.current && isListeningRef.current) {
          // Restart recognition automatically in continuous scrub mode
          try {
            recognition.start();
          } catch {
            isListeningRef.current = false;
            setIsListening(false);
          }
        } else {
          isListeningRef.current = false;
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to initialize SpeechRecognition:', err);
      setError(err?.message || 'Failed to start speech recognition');
      setIsListening(false);
      isListeningRef.current = false;
    }
  }, [language, processQuery, speak]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setMatchedIntent(null);
    setError(null);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore
        }
      }
      cancelSpeech();
    };
  }, [cancelSpeech]);

  return {
    isListening,
    isSupported,
    isSpeaking,
    transcript,
    interimTranscript,
    matchedIntent,
    error,
    continuousScrubMode,
    startListening,
    stopListening,
    toggleListening,
    setContinuousScrubMode,
    speak,
    cancelSpeech,
    processQuery,
    clearTranscript
  };
}
