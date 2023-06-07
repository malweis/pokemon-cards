import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export function Boton({ text, onClick, className }: ButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}
