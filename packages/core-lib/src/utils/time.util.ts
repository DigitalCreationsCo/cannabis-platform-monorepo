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
