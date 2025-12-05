const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return {
      ok: false,
      message: data.message || 'Login failed'
    };
  }

  return {
    ok: true,
    data: await res.json() // { message, token }
  };
}

export async function register(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return {
      ok: false,
      message: data.message || 'Register failed'
    };
  }

  return {
    ok: true,
    data: await res.json() // { message, token }
  };
}

export async function getMe() {
  const res = await fetch(`${API_URL}/api/user/getProfile`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'  
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return {
      ok: false,
      message: data.message || 'Not authorized'
    }
  }
  
  return {
    ok: true,
    data: await res.json()  // { user }
  };
}

export async function logout() {
  const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return {
      ok: false,
      message: data.message || 'Logout failed'
    };
  }

  return {
    ok: true,
    data: await res.json() // { message }
  };
}