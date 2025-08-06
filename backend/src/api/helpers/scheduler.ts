import cron from 'node-cron';
import { dailyTask, monthlyTask, yearlyTask } from './tasks';

// 9pm Eastern Time = 21:00 America/New_York
cron.schedule('0 21 * * *', dailyTask, { timezone: 'America/New_York' });
cron.schedule('0 21 1 * *', monthlyTask, { timezone: 'America/New_York' });
cron.schedule('0 21 1 1 *', yearlyTask, { timezone: 'America/New_York' });
dailyTask(); // TEMP: Run dailyTask immediately for testing
