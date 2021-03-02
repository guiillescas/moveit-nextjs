import React, { ReactElement } from 'react';
import { signIn } from 'next-auth/client';

export default function SignIn(): ReactElement {
  return (
    <button type="button" onClick={() => signIn('github')}>
      Logar
    </button>
  );
}
