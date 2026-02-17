import { TZDate } from '@date-fns/tz';
import { startOfDay } from 'date-fns';

/**
 * Utility function to get the start of the day in UTC milliseconds for a given timestamp and timezone.
 * @param timestamp - The timestamp (in milliseconds) for which to calculate the day start.
 * @param timezone - The IANA timezone string (e.g., "America/New_York").
 * @returns The start of the day in UTC milliseconds for the given timestamp and timezone.
 */
export function getZonedStartOfDayTimestamp(
  timestamp: number,
  timezone: string,
): number {
  return startOfDay(new TZDate(timestamp, timezone)).getTime();
}
