import { format } from 'date-fns';

export default function PostDate({ dateString }: { dateString: string }) {
	if (!dateString) return null;

	const date = new Date(dateString);
	return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>;
}
