import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function LanguageSelector({ value, onValueChange }: LanguageSelectorProps) {
  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' }
  ];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <Globe className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="flex items-center gap-2">
              {lang.native} ({lang.name})
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}