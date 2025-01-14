"use client"; // Make sure this page is treated as a client-side component

import { Suspense } from 'react';
import { AuthForm } from './auth-form';
import { AuthHeader } from './auth-header';

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="auth-container">
        <AuthHeader />
        <AuthForm />
      </div>
    </Suspense>
  );
}
