import { Request, Response } from 'express';
import { IProfileInfo } from '../../models/api/home/profile-info';
import User from '../../models/db/user';
import Goals from '../../models/db/goals';
import mongoose, { Types } from 'mongoose';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';

export const getProfileInfo = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const result = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userID) } },
      {
        $lookup: {
          from: 'Goals',
          localField: '_id',
          foreignField: 'userID',
          as: 'userGoals',
        },
      },
      {
        $unwind: '$userGoals',
      },
      {
        $project: {
          _id: 0,
          firstName: 1,
          lastName: 1,
          profileImage: { $ifNull: ['$profileImage', ''] },
          gender: 1,
          age: 1,
          height: 1,
          weight: 1,
          weightGoal: 1,
          exerciseStreak: '$userGoals.exerciseStreak',
          eatingGoalStreak: '$userGoals.eatingGoalStreak',
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'User or Goals not found' });
    }

    const profileInfo: IProfileInfo = result[0];
    res.status(200).json(profileInfo);
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};
