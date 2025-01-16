/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicated-branches */
import { fetcher, type ApiResponse, useCanAccess } from '@gras/core';
import { type Event, type DailyDeal, type Dispensary } from '@gras/data-access';
import { H2, H3, Paragraph } from '@gras/ui';
import {
	PencilSquareIcon,
	XCircleIcon,
	ClockIcon,
} from '@heroicons/react/20/solid';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import cronToHuman from 'cron-to-human';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import ConfirmationDialog from '@/components/shared/ConfirmationDialog';
import { Table } from '@/components/shared/table/Table';
import UpdateDailyDeal from '@/components/team/UpdateDailyDeal';
import EventsCalendar from '../shared/EventsCalendar';

interface EventsProps {
	// token: string;
	team: Dispensary;
	events: Event[];
}

const Events = ({ team, events }: EventsProps) => {
	console.info('events: ', events);
	const { t } = useTranslation('common');

	const { mutate: mutateEvents } = useSWR(
		team?.slug ? `/api/dispensaries/${team?.slug}/events` : null,
		fetcher
	);

	const { canAccess } = useCanAccess();
	const canUpdateEvent = () => {
		return canAccess('team_event', ['update']);
	};
	const canDeleteEvent = () => {
		return canAccess('team_event', ['delete']);
	};

	const [selectEvent, setSelectEvent] = useState<Event | null>(null);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);

	const updateEvent = async (event: Event) => {
		try {
			if (!event.id) {
				throw new Error(t('select-event'));
			}

			const response = await fetch(
				`/api/dispensaries/${team.slug}/events/${event.id}`,
				{
					method: 'PATCH',
					body: JSON.stringify(event),
				}
			);

			if (!response.ok) {
				const json = await response.json();
				throw new Error(json.error.message);
			}

			toast.success(t('successfully-sent'));
			mutateEvents();
		} catch (error: any) {
			console.error('update event error: ', error);
			toast.error(error.message);
		} finally {
			setSelectEvent(null);
			setShowUpdateModal(false);
		}
	};

	const deleteEvent = async () => {
		try {
			if (!selectEvent) {
				throw new Error(t('select-event'));
			}

			const response = await fetch(
				`/api/dispensaries/${team.slug}/events/${selectEvent.id}`,
				{
					method: 'DELETE',
				}
			);

			if (!response.ok) {
				const json = await response.json();
				throw new Error(json.error.message);
			}

			toast.success(t('event-deleted'));
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			mutateEvents();
			setSelectEvent(null);
			setDeleteConfirmation(false);
		}
	};

	return (
		<div className="my-4 flex grow flex-col gap-y-4">
			<div>
				<H3 className="font-medium">Scheduled Events</H3>
				{events
					.filter((event) => !event.is_cancelled)
					.map((event) => (
						<div
							key={event.name}
							className="bg-gray-100 hover:bg-gray-200 transition rounded p-1"
						>
							{event.name}
						</div>
					))}
			</div>
			<EventsCalendar
				events={events}
				updateEvent={updateEvent}
				deleteEvent={deleteEvent}
			/>
			{/* <Table
				cols={[
					'schedule',
					t('title'),
					t('message'),
					t('send'),
					'edit',
					'delete',
				]}
				body={dailyDeals.map((deal) => {
					const [time, ampm, wday, mday, th, month]: string[] = cronToHuman
						.convertInstruction(deal.schedule, {
							abbr: false,
							parser: {
								currentDate: new Date(Date.now()).toISOString(),
								tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
							},
						})
						.results.split(' ');

					const showSchedule =
						(deal.doesRepeat &&
							deal.schedule &&
							`repeats ${wday} ${mday} ${th} ${month} at ${time} ${ampm}`) ||
						`does not repeat`;

					// return (
					//   <FlexBox
					//     key={`daily-deal-${index + 1}`}
					//     className="shadow-md border-dark bg-inverse rounded w-[386px] h-[186px] p-4 flex-col"
					//   >
					//     <FlexBox className="grow w-full gap-y-2">
					//       <FlexBox className="flex-row w-full justify-between">
					//         <Paragraph className="font-semibold">
					//           {deal.title}
					//         </Paragraph>
					//         <Paragraph className="text-primary font-semibold">
					//           {(deal.isActive && 'active') || ''}
					//         </Paragraph>
					//       </FlexBox>
					//       <div className="w-full">
					//         <FlexBox className="flex-row justify-between w-full">
					//           <Small>
					//             {deal.startTime
					//               ? `created ${showDay(deal.startTime)} ${showTime(
					//                   deal.startTime
					//                 )}`
					//               : null}
					//           </Small>
					//           {deal.endTime && (
					//             <Small>{`expires ${new Date(
					//               deal.endTime
					//             ).toDateString()}`}</Small>
					//           )}
					//         </FlexBox>
					//         {(deal.doesRepeat && deal.schedule && (
					//           <Small>
					//             {`repeats ${wday} ${mday} ${th} ${month} at ${time} ${ampm}`}
					//           </Small>
					//         )) || <Small>{`does not repeat`}</Small>}
					//       </div>
					return {
						id: deal.id,
						cells: [
							{
								element: deal.doesRepeat ? (
									<div
										className="tooltip absolute tooltip-warning"
										data-tip={showSchedule}
									>
										<ClockIcon height={24} width={24} />
									</div>
								) : (
									<>One time</>
								),
							},
							{
								wrap: true,
								element: (
									<div className="flex items-center justify-start space-x-2">
										<Paragraph className="font-semibold">
											{deal.title}
										</Paragraph>
									</div>
								),
							},
							{ wrap: true, text: deal.message },
							{
								actions: canSendMessage()
									? [
											{
												icon: <PaperAirplaneIcon height={24} width={24} />,
												text: t('send'),
												onClick: () => {
													setSelectedTextMessage(deal);
													setSendConfirmation(true);
												},
											},
										]
									: [],
							},
							{
								actions: canUpdateDeal()
									? [
											{
												icon: <PencilSquareIcon height={24} width={24} />,
												text: t('edit'),
												onClick: () => {
													setSelectedTextMessage(deal);
													setShowUpdateModal(true);
												},
											},
										]
									: [],
							},
							{
								actions: canDeleteDeal()
									? [
											{
												icon: <XCircleIcon height={24} width={24} />,
												destructive: true,
												color: 'error',
												text: t('delete'),
												onClick: () => {
													setSelectedTextMessage(deal);
													setDeleteConfirmation(true);
												},
											},
										]
									: [],
							},
						],
					};
				})}
			></Table> */}

			{/* <UpdateDailyDeal
				modalVisible={showUpdateModal}
				onCancel={() => {
					setShowUpdateModal(false);
					setSelectedTextMessage(null);
				}}
				team={team}
				deal={selectedTextMessage!}
			/> */}

			{/* <ConfirmationDialog
				visible={deleteConfirmation}
				title={t('confirm-delete-event') + `: ${selectEvent?.name}`}
				onCancel={() => {
					setDeleteConfirmation(false);
				}}
				onConfirm={() => {
					deleteMessage();
				}}
				confirmText={t('delete')}
			>
				{t('delete-daily-deal')}
			</ConfirmationDialog> */}
		</div>
	);
};

export default Events;
