'use client';

import { signIn } from 'next-auth/react';
import { Button } from './ui/Button';

type SignInButtonProps = {
  text: string;
};

export default function SignInButton({ text }: SignInButtonProps) {
  return (
    <Button
      onClick={() => {
        signIn('google').catch(console.error);
      }}
    >
      {text}
    </Button>
  );
}
