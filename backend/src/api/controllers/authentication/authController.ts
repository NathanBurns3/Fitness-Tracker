import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/db/user';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';

export const signup = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { password, email } = req.body;
    const newUser = new User({ password, email });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    );
    res.json({ token });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};
