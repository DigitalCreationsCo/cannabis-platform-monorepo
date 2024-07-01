/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicated-branches */
import { fetcher, type ApiResponse, useCanAccess } from '@cd/core-lib';
import { type DailyDeal, type Dispensary } from '@cd/data-access';
import { Paragraph } from '@cd/ui-lib';
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

interface DailyDealsProps {
	token: string;
	team: Dispensary;
	isSubscribedOrThrow: () => void;
	showSubscription: () => void;
}

const DailyDeals = ({
	token,
	team,
	isSubscribedOrThrow,
	showSubscription,
}: DailyDealsProps) => {
	const { t } = useTranslation('common');

	const { data, mutate: mutateDailyDeals } = useSWR<ApiResponse<DailyDeal[]>>(
		team?.slug ? `/api/dispensaries/${team.slug}/daily-deals` : null,
		fetcher
	);
	const dailyDeals = data?.data || [];

	const { canAccess } = useCanAccess();
	const canSendMessage = () => {
		return canAccess('team_daily_deals', ['send']);
	};
	const canUpdateDeal = () => {
		return canAccess('team_daily_deals', ['update']);
	};
	const canDeleteDeal = () => {
		return canAccess('team_daily_deals', ['delete']);
	};

	const [selectedTextMessage, setSelectedTextMessage] =
		useState<DailyDeal | null>(null);

	const [sendConfirmation, setSendConfirmation] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	const sendMessage = async () => {
		try {
			isSubscribedOrThrow();

			if (!selectedTextMessage) {
				throw new Error(t('select-message-to-send'));
			}

			const response = await fetch(
				`/api/dispensaries/${team.slug}/daily-deals/send`,
				{
					method: 'POST',
					body: JSON.stringify(selectedTextMessage),
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (!response.ok) {
				const json = await response.json();
				throw new Error(json.error.message);
			}

			toast.success(t('successfully-sent'));
			mutateDailyDeals();
		} catch (error: any) {
			console.error('send message error', error);
			if (error.message === t('select-message-to-send')) {
				showSubscription();
			} else toast.error(error.message);
		} finally {
			setSelectedTextMessage(null);
			setSendConfirmation(false);
		}
	};

	const deleteMessage = async () => {
		try {
			if (!selectedTextMessage) {
				throw new Error(t('select-message-to-delete'));
			}

			console.info('selectedMessage.id', selectedTextMessage.id);
			const response = await fetch(
				`/api/dispensaries/${team.slug}/daily-deals/${selectedTextMessage.id}`,
				{
					method: 'DELETE',
				}
			);

			if (!response.ok) {
				const json = await response.json();
				throw new Error(json.error.message);
			}

			toast.success(t('daily-deal-deleted'));
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			mutateDailyDeals();
			setSelectedTextMessage(null);
			setDeleteConfirmation(false);
		}
	};

	return (
		<div className="my-4 flex grow flex-col gap-y-4">
			<Table
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
			></Table>

			<UpdateDailyDeal
				modalVisible={showUpdateModal}
				onCancel={() => {
					setShowUpdateModal(false);
					setSelectedTextMessage(null);
				}}
				team={team}
				deal={selectedTextMessage!}
			/>

			<ConfirmationDialog
				visible={sendConfirmation}
				title={t('send-daily-deal') + `: ${selectedTextMessage?.title}`}
				onCancel={() => {
					setSendConfirmation(false);
					setSelectedTextMessage(null);
				}}
				onConfirm={() => {
					if (selectedTextMessage) sendMessage();
				}}
				confirmText={t('send')}
			>
				{t('confirm-message-send')}
			</ConfirmationDialog>

			<ConfirmationDialog
				visible={deleteConfirmation}
				title={
					t('confirm-delete-daily-deal') + `: ${selectedTextMessage?.title}`
				}
				onCancel={() => {
					setDeleteConfirmation(false);
				}}
				onConfirm={() => {
					deleteMessage();
				}}
				confirmText={t('delete')}
			>
				{t('delete-daily-deal')}
			</ConfirmationDialog>
		</div>
	);
};

export default DailyDeals;
