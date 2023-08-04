import { type Schedule } from '@cd/data-access';

const parseDaysFromSchedule = (days: number) =>
	String(days).split('').map(Number);

function checkIsDispensaryOpen(schedule: Schedule): boolean | null {
	try {
		const now = new Date();

		const { openAt, closeAt } = schedule;
		if (!openAt || !closeAt) {
			return null;
		}

		const openTime = new Date();
		openTime.setHours(openAt);

		const closeTime = new Date();
		closeTime.setHours(closeAt);

		const days = parseDaysFromSchedule(schedule.days);
		return days.includes(now.getDay()) && now > openTime && now < closeTime;
	} catch (error) {
		return null;
	}
}

export { checkIsDispensaryOpen };
