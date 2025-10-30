
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality, Blob } from '@google/genai';

// Helper functions for audio processing
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const Spinner: React.FC = () => <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>;
const Alert: React.FC<{ message: string }> = ({ message }) => <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg" role="alert">{message}</div>;

interface TranscriptMessage {
    role: 'user' | 'maestro';
    text: string;
}

export const FormalEvaluation: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'connecting' | 'active' | 'finished'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
    
    const sessionRef = useRef<LiveSession | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [transcript]);

    const cleanup = useCallback(() => {
        console.log("Cleaning up resources...");
        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (sessionRef.current) {
            sessionRef.current.close();
            sessionRef.current = null;
        }
        setStatus('idle');
    }, []);

    const startEvaluation = async () => {
        setStatus('connecting');
        setError(null);
        setTranscript([{ role: 'maestro', text: 'Connecting to the Aula Magna...' }]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        console.log('Session opened');
                        setTranscript([{ role: 'maestro', text: 'Welcome to the Aula Magna. I am Maestre Arco. Today you will demonstrate your mastery of intermediate vocal technique. Take a deep breath. When you are ready, begin your performance.' }]);
                        setStatus('active');
                    },
                    onmessage: (message: LiveServerMessage) => {
                        if (message.serverContent?.outputTranscription) {
                            const text = message.serverContent.outputTranscription.text;
                            setTranscript(prev => {
                                const last = prev[prev.length - 1];
                                if (last && last.role === 'maestro') {
                                    return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                                }
                                return [...prev, { role: 'maestro', text }];
                            });
                        } else if (message.serverContent?.inputTranscription) {
                            const text = message.serverContent.inputTranscription.text;
                            setTranscript(prev => {
                                const last = prev[prev.length - 1];
                                if (last && last.role === 'user') {
                                    return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                                }
                                return [...prev, { role: 'user', text }];
                            });
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Session error:', e);
                        setError('Connection to the Aula Magna was lost. Please try again.');
                        cleanup();
                    },
                    onclose: (e: CloseEvent) => {
                        console.log('Session closed');
                        setStatus('finished');
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    outputAudioTranscription: {},
                    inputAudioTranscription: {},
                    systemInstruction: 'You are Maestre Arco, a fair but kind conservatory evaluator. You are conducting a real-time evaluation. Greet the student, ask them to perform their piece for "Module 3: Intermediate Vocal Technique", listen to their performance, and then give them conversational, constructive feedback. Keep your responses relatively short and in English.',
                },
            });
            
            sessionRef.current = await sessionPromise;

            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
            audioContextRef.current = new AudioContext({ sampleRate: 16000 });
            
            const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
            scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                const pcmBlob = createBlob(inputData);
                if (sessionRef.current) {
                    sessionRef.current.sendRealtimeInput({ media: pcmBlob });
                }
            };

            source.connect(scriptProcessorRef.current);
            scriptProcessorRef.current.connect(audioContextRef.current.destination);

        } catch (err) {
            console.error(err);
            setError("Could not start the evaluation. Please check microphone permissions and your connection.");
            cleanup();
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="text-center mb-4">
                     <h3 className="text-2xl font-bold text-white">Live Conversational Evaluation</h3>
                     <p className="text-gray-400 mt-1">Module 3: Intermediate Vocal Technique</p>
                </div>

                <div className="h-96 bg-gray-900/50 rounded-lg p-4 flex flex-col overflow-y-auto border border-gray-700 mb-4">
                     <div className="flex-grow space-y-4">
                        {transcript.map((msg, i) => (
                            <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                {msg.role === 'maestro' && <img src="https://picsum.photos/seed/arco/40" alt="Maestre Arco" className="w-10 h-10 rounded-full flex-shrink-0" />}
                                {msg.role === 'user' && <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center font-bold flex-shrink-0">YOU</div>}
                                <div className={`max-w-xl p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-800' : 'bg-gray-700'}`}>
                                   <p className="text-white whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                     <div ref={messagesEndRef} />
                </div>
                
                {error && <div className="my-4"><Alert message={error} /></div>}

                <div className="text-center">
                    {status === 'idle' && (
                        <button onClick={startEvaluation} className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg">
                            Begin Evaluation
                        </button>
                    )}
                    {status === 'connecting' && (
                         <button disabled className="bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg flex items-center justify-center mx-auto">
                            <Spinner /> <span className="ml-2">Connecting...</span>
                        </button>
                    )}
                     {status === 'active' && (
                        <button onClick={cleanup} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg">
                            End Evaluation
                        </button>
                    )}
                     {status === 'finished' && (
                        <div className="animate-fade-in">
                           <p className="text-green-400 mb-4">Evaluation finished. Excellent work!</p>
                           <button onClick={startEvaluation} className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg">
                                Take another evaluation
                           </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
