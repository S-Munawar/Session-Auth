'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const fn = mode === 'login' ? login : register;
      const res = await fn(email, password);
      if (!res.ok) {
        setError(res.message || 'Something went wrong');
        return;
      }
      console.log('Authentication successful');
      router.push('/');
    } catch (err : unknown) {
      console.error('Authentication error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: 320,
          padding: 24,
          border: '1px solid #ddd',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
      >
        <h1>{mode === 'login' ? 'Login' : 'Register'}</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />

        {error && (
          <div style={{ color: 'red', fontSize: 14 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 8,
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {loading
            ? 'Please wait...'
            : mode === 'login'
            ? 'Login'
            : 'Register'}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          style={{
            marginTop: 8,
            background: 'transparent',
            border: 'none',
            color: '#555',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          {mode === 'login'
            ? 'No account? Register'
            : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
}
