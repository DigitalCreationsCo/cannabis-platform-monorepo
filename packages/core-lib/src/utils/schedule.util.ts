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
		const openTime = new Date(day.openAt);
		const closeTime = new Date(day.closeAt);

		// const openTime = new Date();
		// openTime.setHours(openAt);

		// const closeTime = new Date();
		// closeTime.setHours(closeAt);

		// const days = parseDaysFromSchedule(schedule.days);
		return now > openTime && now < closeTime;
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
		.sort((a, b) => a.dayIndex - b.dayIndex);

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
	return sortedSchedules.length > 0 ? sortedSchedules[0] : null;
}
