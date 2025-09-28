import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  Accessibility,
  ZoomIn,
  ZoomOut,
  Palette,
  Sun,
  Eye,
  Lightbulb,
  Underline,
  Type,
  RotateCcw
} from 'lucide-react';

interface AccessibilitySettings {
  fontSize: number;
  isGrayscale: boolean;
  isHighContrast: boolean;
  isNegativeContrast: boolean;
  isLightBackground: boolean;
  areLinksUnderlined: boolean;
  isReadableFont: boolean;
}

export function AccessibilityButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 16,
    isGrayscale: false,
    isHighContrast: false,
    isNegativeContrast: false,
    isLightBackground: false,
    areLinksUnderlined: false,
    isReadableFont: false
  });

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    root.style.setProperty('--font-size', `${settings.fontSize}px`);
    
    // Grayscale
    if (settings.isGrayscale) {
      root.style.filter = 'grayscale(100%)';
    } else {
      root.style.filter = '';
    }
    
    // High contrast
    if (settings.isHighContrast) {
      root.classList.add('accessibility-high-contrast');
    } else {
      root.classList.remove('accessibility-high-contrast');
    }
    
    // Negative contrast
    if (settings.isNegativeContrast) {
      root.classList.add('accessibility-negative-contrast');
    } else {
      root.classList.remove('accessibility-negative-contrast');
    }
    
    // Light background
    if (settings.isLightBackground) {
      root.classList.add('accessibility-light-background');
    } else {
      root.classList.remove('accessibility-light-background');
    }
    
    // Links underlined
    if (settings.areLinksUnderlined) {
      root.classList.add('accessibility-links-underlined');
    } else {
      root.classList.remove('accessibility-links-underlined');
    }
    
    // Readable font
    if (settings.isReadableFont) {
      root.classList.add('accessibility-readable-font');
    } else {
      root.classList.remove('accessibility-readable-font');
    }
  }, [settings]);

  const increaseFontSize = (): void => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.min(prev.fontSize + 2, 24)
    }));
  };

  const decreaseFontSize = (): void => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.max(prev.fontSize - 2, 12)
    }));
  };

  const toggleGrayscale = (): void => {
    setSettings(prev => ({
      ...prev,
      isGrayscale: !prev.isGrayscale
    }));
  };

  const toggleHighContrast = (): void => {
    setSettings(prev => ({
      ...prev,
      isHighContrast: !prev.isHighContrast,
      isNegativeContrast: false // Disable negative contrast when enabling high contrast
    }));
  };

  const toggleNegativeContrast = (): void => {
    setSettings(prev => ({
      ...prev,
      isNegativeContrast: !prev.isNegativeContrast,
      isHighContrast: false // Disable high contrast when enabling negative contrast
    }));
  };

  const toggleLightBackground = (): void => {
    setSettings(prev => ({
      ...prev,
      isLightBackground: !prev.isLightBackground
    }));
  };

  const toggleLinksUnderlined = (): void => {
    setSettings(prev => ({
      ...prev,
      areLinksUnderlined: !prev.areLinksUnderlined
    }));
  };

  const toggleReadableFont = (): void => {
    setSettings(prev => ({
      ...prev,
      isReadableFont: !prev.isReadableFont
    }));
  };

  const resetSettings = (): void => {
    setSettings({
      fontSize: 16,
      isGrayscale: false,
      isHighContrast: false,
      isNegativeContrast: false,
      isLightBackground: false,
      areLinksUnderlined: false,
      isReadableFont: false
    });
  };

  const accessibilityOptions = [
    {
      icon: ZoomIn,
      label: 'Increase Text',
      action: increaseFontSize,
      active: settings.fontSize > 16
    },
    {
      icon: ZoomOut,
      label: 'Decrease Text',
      action: decreaseFontSize,
      active: settings.fontSize < 16
    },
    {
      icon: Palette,
      label: 'Grayscale',
      action: toggleGrayscale,
      active: settings.isGrayscale
    },
    {
      icon: Sun,
      label: 'High Contrast',
      action: toggleHighContrast,
      active: settings.isHighContrast
    },
    {
      icon: Eye,
      label: 'Negative Contrast',
      action: toggleNegativeContrast,
      active: settings.isNegativeContrast
    },
    {
      icon: Lightbulb,
      label: 'Light Background',
      action: toggleLightBackground,
      active: settings.isLightBackground
    },
    {
      icon: Underline,
      label: 'Links Underline',
      action: toggleLinksUnderlined,
      active: settings.areLinksUnderlined
    },
    {
      icon: Type,
      label: 'Readable Font',
      action: toggleReadableFont,
      active: settings.isReadableFont
    },
    {
      icon: RotateCcw,
      label: 'Reset',
      action: resetSettings,
      active: false
    }
  ];

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 accessibility-widget">
      <div className="relative">
        {/* Main Accessibility Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="accessibility-main-button w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg border-none flex items-center justify-center transition-all duration-300"
          aria-label="Accessibility Tools"
        >
          <Accessibility className="w-8 h-8" />
        </Button>

        {/* Expanded Panel */}
        {isExpanded && (
          <Card className="absolute left-20 top-0 w-64 bg-white shadow-2xl border border-gray-200 accessibility-panel animate-in slide-in-from-left-4 duration-300">
            <CardContent className="p-0">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Accessibility className="w-5 h-5 text-blue-600" />
                  Accessibility Tools
                </h3>
              </div>
              
              <div className="p-2 max-h-96 overflow-y-auto">
                {accessibilityOptions.map((option, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={option.action}
                    className={`w-full justify-start h-auto py-3 px-3 text-left hover:bg-gray-50 transition-colors ${
                      option.active ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <option.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${
                      option.active ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                    <span className="text-sm">{option.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Overlay to close panel when clicking outside */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}