import cron from 'node-cron';
import { dailyTask, monthlyTask, yearlyTask } from './tasks';

// 9:15pm Eastern Time = 21:15 America/New_York
cron.schedule('15 21 * * *', dailyTask, { timezone: 'America/New_York' });
cron.schedule('15 21 1 * *', monthlyTask, { timezone: 'America/New_York' });
cron.schedule('15 21 1 1 *', yearlyTask, { timezone: 'America/New_York' });
//dailyTask(); // TEMP: Run dailyTask immediately
