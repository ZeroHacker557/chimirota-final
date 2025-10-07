import React from 'react';

interface IslamicPatternProps {
  className?: string;
}

const IslamicPattern: React.FC<IslamicPatternProps> = ({ className = '' }) => {
  return (
    <div className={`islamic-pattern ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
        <defs>
          <pattern id="islamicPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <g fill="currentColor" fillOpacity="0.1">
              <circle cx="10" cy="10" r="2"/>
              <path d="M10,2 L18,10 L10,18 L2,10 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <path d="M6,6 L14,6 L14,14 L6,14 Z" fill="none" stroke="currentColor" strokeWidth="0.3"/>
            </g>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#islamicPattern)"/>
      </svg>
    </div>
  );
};

export default IslamicPattern;