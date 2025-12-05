'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe, logout } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

useEffect( () => {
  async function fetchData() {
    try {
      const res = await getMe();
      if (!res.ok) throw new Error(res.message);
      setUserEmail(res.data.user.email); // res.data.email = res.data.user.email because data = { user }
      console.log('User data fetched:', res.data);
    } catch {
      router.push('/login');
    }
    finally{
      setLoading(false);
    }}
  fetchData();
}, [router]);

const handleLogout = async () => {
  try {
    await logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {userEmail}</p>
      <button
        onClick={() => handleLogout()}
        style={{
          marginTop: 16,
          padding: 8,
          borderRadius: 4,
          border: '1px solid #333',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
}
