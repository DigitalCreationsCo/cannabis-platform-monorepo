import { type Event } from '@cd/data-access';
import { FlexBox } from '@cd/ui-lib';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

export default function EventsCalendar({
	events,
	updateEvent,
	deleteEvent,
}: {
	events: Event[];
	updateEvent: (event: Event) => void;
	deleteEvent: (id: string) => void;
}) {
	const renderEventContent = (eventInfo: any) => {
		return (
			<FlexBox className="p-1">
				<div>{eventInfo.event._def.extendedProps.name}</div>
				<div>{eventInfo.timeText}</div>
			</FlexBox>
		);
	};

	function handleEventClick(clickInfo: any) {
		// if (
		// 	confirm(
		// 		`Are you sure you want to delete the event '${clickInfo.event.title}'`
		// 	)
		// ) {
		// 	clickInfo.event.remove();
		// }
		// deleteEvent(clickInfo.event.id);
	}
	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			editable={true}
			selectable={true}
			events={events}
			eventContent={renderEventContent}
			eventClick={handleEventClick}
		/>
	);
}
