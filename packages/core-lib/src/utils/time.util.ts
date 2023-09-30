export const showTime = (time: Date) =>
	time.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});

export function calculateDeliveryDeadline(): Date {
	const hour = 60 * 60 * 1000;
	const deliveryTime = Number(process.env.NEXT_PUBLIC_DELIVERY_TIME);
	return new Date(Date.now() + deliveryTime * hour);
}

export function integerToTime(number: number): string {
	if (number < 0 || number > 2359) throw new Error('Invalid time');
	const hours = Math.floor(number / 100);
	const minutes = number % 100;
	const period = hours < 12 ? 'am' : 'pm';
	const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
	return `${formattedHours}:${formattedMinutes}${period}`;
}
