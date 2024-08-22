import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dailyInfo from '../../models/db/dailyInfo';
import monthlyInfo from '../../models/db/monthlyInfo';
import yearlyInfo from '../../models/db/yearlyInfo';
import goals from '../../models/db/goals';
import { dailyTask, monthlyTask, yearlyTask } from '../tasks';

jest.mock('../../models/db/dailyInfo');
jest.mock('../../models/db/monthlyInfo');
jest.mock('../../models/db/yearlyInfo');
jest.mock('../../models/db/goals');

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Tasks', () => {
  it('should run dailyTask correctly', async () => {
    const userID = new mongoose.Types.ObjectId();
    goals.find = jest.fn().mockReturnValue({
      distinct: jest.fn().mockResolvedValue([userID]),
    });

    dailyInfo.findOne = jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue({
        userID,
        foods: [
          {
            nutritions: {
              calories: 100,
              protein: 10,
              carbs: 20,
              fat: 5,
              fiber: 2,
            },
          },
        ],
        exercisesCompleted: [{ muscleGroup: 'legs', sets: 3 }],
      }),
    });

    dailyInfo.updateMany = jest
      .fn()
      .mockImplementation(async (filter, update) => {
        if (filter.userID.equals(userID)) {
          dailyInfo.findOne = jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue({
              userID,
              foods: [],
              exercisesCompleted: [],
            }),
          });
        }
      });

    monthlyInfo.findOne = jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue({
        userID,
        sets: [{ muscleGroup: 'legs', sets: 3 }],
        goalsCompleted: [
          { day: new Date(), exerciseGoal: true, eatingGoal: false },
        ],
      }),
      save: jest.fn().mockResolvedValue({}),
    });

    yearlyInfo.findOne = jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue({
        userID,
        month: [
          {
            month: new Date().getMonth(),
            exerciseGoalsCompleted: 10,
            eatingGoalsCompleted: 10,
          },
        ],
      }),
      save: jest.fn().mockResolvedValue({}),
    });

    goals.findOne = jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue({
        userID,
        exerciseStreak: 1,
        eatingGoalStreak: 1,
        foodGoals: {
          calories: 2000,
          protein: 150,
          carbs: 250,
          fat: 70,
          fiber: 30,
        },
      }),
      save: jest.fn().mockResolvedValue({}),
    });

    await dailyTask();

    const monthlyDoc = await monthlyInfo.findOne({ userID }).lean();
    expect(monthlyDoc?.sets).toEqual([{ muscleGroup: 'legs', sets: 3 }]);
    expect(monthlyDoc?.goalsCompleted.length).toBe(1);
    expect(monthlyDoc?.goalsCompleted[0].eatingGoal).toBe(false);

    const yearlyDoc = await yearlyInfo.findOne({ userID }).lean();
    expect(yearlyDoc?.month.length).toBe(1);

    const goalsDoc = await goals.findOne({ userID }).lean();
    expect(goalsDoc?.exerciseStreak).toBe(1);
    expect(goalsDoc?.eatingGoalStreak).toBe(1);

    const dailyDoc = await dailyInfo.findOne({ userID }).lean();
    expect(dailyDoc?.foods.length).toBe(0);
    expect(dailyDoc?.exercisesCompleted.length).toBe(0);
  });

  it('should run monthlyTask correctly', async () => {
    const userID = new mongoose.Types.ObjectId();
    goals.find = jest.fn().mockReturnValue({
      distinct: jest.fn().mockResolvedValue([userID]),
    });

    monthlyInfo.findOne = jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue({
        userID,
        sets: [],
        goalsCompleted: [],
      }),
      save: jest.fn().mockResolvedValue({}),
    });

    await monthlyTask();

    const monthlyDoc = await monthlyInfo.findOne({ userID }).lean();
    expect(monthlyDoc?.sets.length).toBe(0);
    expect(monthlyDoc?.goalsCompleted.length).toBe(0);
  });

  it('should run yearlyTask correctly', async () => {
    const userID = new mongoose.Types.ObjectId();
    goals.find = jest.fn().mockReturnValue({
      distinct: jest.fn().mockResolvedValue([userID]),
    });

    yearlyInfo.findOne = jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue({
        userID,
        month: [],
      }),
      save: jest.fn().mockResolvedValue({}),
    });

    await yearlyTask();

    const yearlyDoc = await yearlyInfo.findOne({ userID }).lean();
    expect(yearlyDoc?.month.length).toBe(0);
  });
});
