/* eslint-disable @typescript-eslint/naming-convention */
type Day = any;
import { type Schedule } from '@cd/data-access';

const parseDaysFromSchedule = (days: number) =>
	String(days).split('').map(Number);

const daysOfWeek: Day[] = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export function checkIsDispensaryOpen(schedule: Schedule[]): boolean | null {
	try {
		const now = new Date();
		const numDay = now.getDay();
		const day = schedule.find(({ day }) => day === daysOfWeek[numDay]);
		if (!day) throw new Error('No day found');

		// Parse openAt and closeAt as hours and minutes
		const openHour = Math.floor(day.openAt / 100);
		const openMinute = day.openAt % 100;
		const closeHour = Math.floor(day.closeAt / 100);
		const closeMinute = day.closeAt % 100;

		const openTime = new Date(now);
		openTime.setHours(openHour, openMinute, 0, 0);
		const closeTime = new Date(now);
		closeTime.setHours(closeHour, closeMinute, 0, 0);

		return now >= openTime && now <= closeTime;
	} catch (error) {
		return null;
	}
}

export function getNextScheduleDay(schedules: Schedule[]): Schedule | null {
	console.info('schedules ', schedules);
	const now = new Date();
	const currentDayIndex = now.getDay(); // 0 (Sunday) to 6 (Saturday)
	const currentTime = now.getHours() * 100 + now.getMinutes(); // HHMM format

	// Sort schedules by day index
	const sortedSchedules = schedules
		.map((schedule) => ({
			...schedule,
			dayIndex: daysOfWeek.indexOf(schedule.day),
		}))
		.sort((a, b) => a.dayIndex - b.dayIndex) as (Schedule & {
		dayIndex: number;
	})[];

	// Find the next schedule day
	for (const schedule of sortedSchedules) {
		const scheduleDayIndex = schedule.dayIndex;

		if (
			scheduleDayIndex > currentDayIndex ||
			(scheduleDayIndex === currentDayIndex &&
				Number(schedule.openAt) > currentTime)
		) {
			switch (true) {
				case scheduleDayIndex === currentDayIndex:
					schedule.day = 'today';
					break;
				case scheduleDayIndex - currentDayIndex === 1 || currentDayIndex === 6:
					schedule.day = 'tomorrow';
					break;
				default:
					// Do nothing, leave the day unchanged
					break;
			}
			return schedule;
		}
	}

	// If no future schedule found in the current week, return the first schedule of the next week
	return sortedSchedules[0] ?? null;
}
