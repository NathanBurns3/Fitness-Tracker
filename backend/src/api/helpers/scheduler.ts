import cron from 'node-cron';
import { dailyTask, monthlyTask, yearlyTask } from './tasks';

cron.schedule('0 0 * * *', dailyTask);
cron.schedule('0 0 1 * *', monthlyTask);
cron.schedule('0 0 1 1 *', yearlyTask);
