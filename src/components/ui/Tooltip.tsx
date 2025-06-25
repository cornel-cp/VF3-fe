import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  // Split content by newlines and wrap each line in a paragraph
  const formattedContent = content.split('\n').map((line, index) => (
    <p key={index} className={index > 0 ? 'mt-1' : ''}>
      {line}
    </p>
  ));

  return (
    <div 
      className="relative block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && (
        <div 
          className={`absolute z-50 ${positions[position]} px-4 py-3 text-sm bg-surface-secondary text-primary rounded-lg border border-primary/20 shadow-glow w-full whitespace-normal`}
        >
          {formattedContent}
          <div 
            className={`absolute w-2 h-2 bg-surface-secondary border-primary/20 transform rotate-45
              ${position === 'top' ? 'border-b border-r bottom-[-5px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'bottom' ? 'border-t border-l top-[-5px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'left' ? 'border-t border-r right-[-5px] top-1/2 -translate-y-1/2' : ''}
              ${position === 'right' ? 'border-b border-l left-[-5px] top-1/2 -translate-y-1/2' : ''}
            `}
          />
        </div>
      )}
      {children}
    </div>
  );
}; 