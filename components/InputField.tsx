import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputProps {
  type: string;
  id: string;
  placeholder: string;
}

export function InputField({ type, placeholder, id }: InputProps) {
  return (
    
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input type={type} id={id} placeholder={placeholder} />
    </div>
  );
}
