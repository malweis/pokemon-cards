import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputProps {
  type: string;
  id: string;
  placeholder: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function InputField({ type, placeholder, id, onKeyDown }: InputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input type={type} id={id} placeholder={placeholder} onKeyDown={onKeyDown} />
    </div>
  );
}
