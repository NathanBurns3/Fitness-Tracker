import cron from 'node-cron';
import { dailyTask, monthlyTask, yearlyTask } from './tasks';

cron.schedule('0 4 * * *', dailyTask, { timezone: 'America/New_York' });
cron.schedule('0 4 1 * *', monthlyTask, { timezone: 'America/New_York' });
cron.schedule('0 4 1 1 *', yearlyTask, { timezone: 'America/New_York' });
