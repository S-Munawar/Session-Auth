import type { Request, Response } from 'express';
// Get User Profile

function getUserProfile(req: Request, res: Response) {
    console.log('Get User Profile endpoint hit');
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized Meow' });

    return res.status(200).json({ user });
}

export { getUserProfile };