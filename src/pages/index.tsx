import React, { ReactElement } from 'react';
import { signIn } from 'next-auth/client';

export default function SignIn(): ReactElement {
  return (
    <button type="button" onClick={() => signIn('github', { redirect_uri: 'https://moveit.guilhermeillescas.dev/' })}>
      Logar
    </button>
  );
}
