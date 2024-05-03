/* eslint-disable @typescript-eslint/naming-convention */
type Day = any;
type Schedule = any;

const parseDaysFromSchedule = (days: number) =>
	String(days).split('').map(Number);

function checkIsDispensaryOpen(schedule: Schedule[]): boolean | null {
	try {
		const now = new Date();
		const numDay = now.getDay();
		const dayMap: Record<number, Day> = {
			0: 'Sunday',
			1: 'Monday',
			2: 'Tuesday',
			3: 'Wednesday',
			4: 'Thursday',
			5: 'Friday',
			6: 'Saturday',
		};
		const day = schedule.find(({ day }) => day === dayMap[numDay]);
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

export { checkIsDispensaryOpen };
