// controllers/auth.ts
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

// Mock user database (replace with real database)
const users = new Map();

// Register endpoint
async function Register(req: Request, res: Response) {
    console.log('Register endpoint invoked');
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Check if user exists
    if (users.has(email)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      name,
      password: hashedPassword
    };

    users.set(email, user);

    // Create session
    req.session.userId = user.id;

    res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login endpoint
async function Login(req: Request, res: Response) {
    console.log('Login endpoint invoked');
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create session
    req.session.userId = user.id;

    res.json({
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Logout endpoint
async function Logout(req: Request, res: Response) {
    console.log('Logout endpoint invoked');
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Default session cookie name
    res.json({ message: 'Logged out successfully' });
  });
};

// Get current user
async function GetCurrentUser(req: Request, res: Response) {
    console.log('GetCurrentUser endpoint invoked');
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // Find user by session userId
  const user = Array.from(users.values()).find(u => u.id === req.session.userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    user: { id: user.id, email: user.email, name: user.name }
  });
};

export { Register, Login, Logout, GetCurrentUser };