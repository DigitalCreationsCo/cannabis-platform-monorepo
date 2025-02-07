import { formatInTimeZone } from 'date-fns-tz';

export default function PostDate({ dateString }: { dateString: string }) {
	if (!dateString) return null;

	const date = new Date(dateString);
	return (
		<time dateTime={dateString}>
			{formatInTimeZone(
				date,
				Intl.DateTimeFormat().resolvedOptions().timeZone,
				'LLLL	d, yyyy'
			)}
		</time>
	);
}
