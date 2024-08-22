import cron from 'node-cron';
import { dailyTask, monthlyTask, yearlyTask } from './tasks';

// Schedule daily task at 12 AM
cron.schedule('0 0 * * *', dailyTask);

// Schedule monthly task at 12 AM on the first day of the month
cron.schedule('0 0 1 * *', monthlyTask);

// Schedule yearly task at 12 AM on the first day of the year
cron.schedule('0 0 1 1 *', yearlyTask);
