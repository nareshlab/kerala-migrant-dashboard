import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceInterfaceProps {
  language: string;
}

export function VoiceInterface({ language }: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    setIsListening(true);
    // Mock voice recognition
    setTimeout(() => {
      const mockTranscripts = {
        en: "I need to find a nearby clinic for check-up",
        ml: "എനിക്ക് പരിശോധനയ്ക്കായി അടുത്തുള്ള ഒരു ക്ലിനിക്ക് കണ്ടെത്തേണ്ടതുണ്ട്",
        hi: "मुझे जांच के लिए पास का क्लिनिक खोजना है",
        ta: "எனக்கு பரிசோதனைக்காக அருகிலுள்ள கிளினிக்கை கண்டுபிடிக்க வேண்டும்"
      };
      setTranscript(mockTranscripts[language as keyof typeof mockTranscripts] || mockTranscripts.en);
      setIsListening(false);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const speak = () => {
    const responses = {
      en: "I found 3 clinics nearby. The closest one is ABC Health Center, 500 meters away.",
      ml: "എനിക്ക് അടുത്ത് 3 ക്ലിനിക്കുകൾ കണ്ടെത്താൻ കഴിഞ്ഞു. ഏറ്റവും അടുത്തത് എബിസി ഹെൽത്ത് സെന്റർ ആണ്, 500 മീറ്റർ അകലെ.",
      hi: "मुझे पास में 3 क्लिनिक मिले हैं। सबसे पास वाला ABC हेल्थ सेंटर है, 500 मीटर की दूरी पर।",
      ta: "எனக்கு அருகிலே 3 கிளினிக்குகள் கிடைத்தன. மிக அருகில் உள்ளது ABC ஹெல்த் சென்டர், 500 மீட்டர் தூரத்தில்."
    };
    alert(responses[language as keyof typeof responses] || responses.en);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Voice Assistant</h3>
        <Button variant="outline" size="sm" onClick={speak}>
          <Volume2 className="w-4 h-4 mr-2" />
          Speak
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant={isListening ? "destructive" : "default"}
          onClick={isListening ? stopListening : startListening}
          disabled={isListening}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4 mr-2" />
              Listening...
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 mr-2" />
              Start Voice
            </>
          )}
        </Button>
        
        {isListening && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Recording...</span>
          </div>
        )}
      </div>
      
      {transcript && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm">{transcript}</p>
        </div>
      )}
    </Card>
  );
}