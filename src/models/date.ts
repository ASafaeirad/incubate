import { TZDate } from '@date-fns/tz';
import { isToday } from 'date-fns';

export function toTimeZonedDate(timestamp: number, timezone: string): Date {
  return new TZDate(timestamp, timezone);
}

export const isTodayInTimezone = (
  timestamp: number,
  timezone: string,
): boolean => {
  return isToday(toTimeZonedDate(timestamp, timezone));
};
