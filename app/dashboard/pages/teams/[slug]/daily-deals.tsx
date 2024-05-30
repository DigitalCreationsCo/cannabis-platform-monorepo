/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicated-branches */
import {
  axios,
  modalActions,
  modalTypes,
  showDay,
  showTime,
  urlBuilder,
  useAppDispatch,
  type ResponseDataEnvelope,
  usStatesAbbreviationList,
  formatToTimeZone,
  TimeZoneMap,
  useDispensary,
  type ApiResponse,
  fetcher,
  truncateWordsAndLeaveN,
} from '@cd/core-lib';
import { type CustomerSMSInvite } from '@cd/core-lib/src/sms/slicktext';
import { type DailyDeal, type Dispensary } from '@cd/data-access';
import {
  Button,
  FlexBox,
  Grid,
  PageHeader,
  Paragraph,
  TextField,
  H2,
  Select,
  TextArea,
  LoadingPage,
  Page,
  Small,
  NewDailyDealModal,
} from '@cd/ui-lib';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { type AxiosResponse } from 'axios';
import cronToHuman from 'cron-to-human';
import { useFormik } from 'formik';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR, { mutate } from 'swr';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import {
  Error as ErrorComponent,
  UpgradeAccountDialog,
} from '@/components/shared';
import ConfirmationDialog from '@/components/shared/ConfirmationDialog';
import env from '@/lib/env';

const dailyDealsInfo = `Daily Deals are a great way to promote your business to your customers.
Messages are sent to your customers via text message. 

Use daily deals to promote products or promote events.

Schedule Daily Deals, or send a one-time message.`;

export default function DailyDealsPage() {
  // const { user, organization, products, orders, dailyDeals } =
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);

  const { isLoading, isError, team } = useDispensary();
  const { t } = useTranslation('common');

  const { data, mutate: mutateDailyDeals } = useSWR<ApiResponse<DailyDeal[]>>(
    team?.slug ? `/api/dispensaries/${team.slug}/daily-deals` : null,
    fetcher
  );

  const dailyDeals = data?.data || [];

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorComponent message={isError.message} />;
  }

  if (!team) {
    return <ErrorComponent message={t('team-not-found')} />;
  }

  const openNewDailyDealModal = () => {
    setShowNewMessageModal(true);
    // dispatch(
    // 	modalActions.openModal({
    // 		modalVisible: true,
    // 		modalType: modalTypes.NewDailyDealModal,
    // 		organization: team,
    // 		onSubmit: () => {
    // 			console.info('on submit');
    // 		},
    // 	}),
    // );
  };

  async function openDailyDealsInfoModal() {
    dispatch(
      modalActions.openModal({
        modalVisible: true,
        modalType: modalTypes.showModal,
        modalText: dailyDealsInfo,
      })
    );
  }

  const isSubscribedForMessagingOrThrow = (team) => {
    if (!team.isSubscribedForMessaging) {
      throw new Error(t('not-subscribed-for-messaging'));
    }
  };

  const DailyDeals = () => {
    const [selectedTextMessage, setSelectedTextMessage] =
      useState<DailyDeal | null>(null);
    const [askSendConfirmation, setSendConfirmation] = useState(false);
    // const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    // const deleteMessage = async (id: string) => {
    //   try {
    //     if (!slec) {
    //       throw new Error(t(Select a message to delete));
    //     }

    //     const response = await fetch(`/api/sessions/${id}`, {
    //       method: 'DELETE',
    //     });

    //     if (!response.ok) {
    //       const json = await response.json();
    //       throw new Error(json.error.message);
    //     }

    //     toast.success(t('session-removed'));

    //     if (sessionToDelete.isCurrent) {
    //       window.location.reload();
    //     }
    //   } catch (error: any) {
    //     toast.error(error.message);
    //   } finally {
    //     mutate();
    //     setSessionToDelete(null);
    //     setAskConfirmation(false);
    //   }
    // };

    const sendMessage = async () => {
      try {
        if (!team.isSubscribedForMessaging) {
          throw new Error(t('not-subscribed-for-messaging'));
        }

        if (!selectedTextMessage) {
          throw new Error(t('select-message-to-send'));
        }

        const response = await fetch(
          `/api/dispensaries/${team.slug}/daily-deals/send`,
          {
            method: 'POST',
            body: JSON.stringify(selectedTextMessage),
          }
        );

        if (!response.ok) {
          const json = await response.json();
          throw new Error(json.error.message);
        }

        toast.success(t('successfully-sent'));
      } catch (error: any) {
        console.error('send message error', error);
        toast.error(error.message);
      } finally {
        mutateDailyDeals();
        setSelectedTextMessage(null);
        setSendConfirmation(false);
      }
    };

    return (
      <div className="my-4 flex grow flex-col gap-y-4">
        <FlexBox className="flex-row items-center">
          <Paragraph className="font-semibold">{`Your latest message`}</Paragraph>
          {/* <Button
					onClick={() => {}}
					size="sm"
					bg="transparent"
					hover="transparent"
					className="hover:text-primary font-semibold underline place-self-start"
				>
					{`Previous messages`}
				</Button> */}
        </FlexBox>
        <Grid className="flex grow flex-col md:flex-row gap-4 flex-wrap">
          {dailyDeals?.length ? (
            dailyDeals.map((deal, index) => {
              const [
                // something,
                time,
                ampm,
                wday,
                mday,
                th,
                month,
              ]: // somethingelse,
              string[] = cronToHuman
                .convertInstruction(deal.schedule, {
                  abbr: false,
                  parser: {
                    currentDate: new Date(Date.now()).toISOString(),
                    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  },
                })
                .results.split(' ');

              // console.info(
              // 	'cron human: ',
              // 	cronToHuman
              // 		.convertInstruction(deal.schedule, {
              // 			abbr: false,
              // 			parser: {
              // 				currentDate: new Date(Date.now()).toISOString(),
              // 				tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
              // 			},
              // 		})
              // 		.results.split(' '),
              // );

              return (
                <FlexBox
                  key={`daily-deal-${index + 1}`}
                  className="shadow-md border-dark bg-inverse rounded w-[386px] h-[186px] p-4 flex-col"
                >
                  <FlexBox className="grow w-full gap-y-2">
                    <FlexBox className="flex-row w-full justify-between">
                      <Paragraph className="font-semibold">
                        {deal.title}
                      </Paragraph>
                      <Paragraph className="text-primary font-semibold">
                        {(deal.isActive && 'active') || ''}
                      </Paragraph>
                    </FlexBox>
                    <div className="w-full">
                      <FlexBox className="flex-row justify-between w-full">
                        <Small>
                          {deal.startTime
                            ? `created ${showDay(deal.startTime)} ${showTime(
                                deal.startTime
                              )}`
                            : null}
                        </Small>
                        {deal.endTime && (
                          <Small>{`expires ${new Date(
                            deal.endTime
                          ).toDateString()}`}</Small>
                        )}
                      </FlexBox>
                      {(deal.doesRepeat && deal.schedule && (
                        <Small>
                          {`repeats ${wday} ${mday} ${th} ${month} at ${time} ${ampm}`}
                        </Small>
                      )) || <Small>{`does not repeat`}</Small>}
                    </div>
                    <Paragraph>
                      {truncateWordsAndLeaveN(deal.message, 24)}
                    </Paragraph>
                  </FlexBox>
                  <Button
                    className="rounded-sm self-end gap-x-2 items-center justify-end"
                    onClick={() => {
                      try {
                        isSubscribedForMessagingOrThrow(team);
                      } catch (error: any) {
                        setShowSubscriptionMessage(true);
                      }
                      setSelectedTextMessage(deal);
                      setSendConfirmation(true);
                    }}
                  >
                    {`Send now`}
                    <ChatBubbleBottomCenterTextIcon
                      height={24}
                      width={24}
                      className="text-dark fill-inverse"
                    />
                  </Button>
                </FlexBox>
              );
            })
          ) : (
            <Paragraph>{`You have no deals. Try adding one.`}</Paragraph>
          )}
        </Grid>

        {/* {deleteTextMessage && (
					<ConfirmationDialog
						visible={askConfirmation}
						title={`Delete Daily Deal: ${deleteTextMessage.title}`}
						onCancel={() => {
							setAskConfirmation(false);
							setDeleteTextMessage(null);
						}}
						onConfirm={() => deleteSession(sessionToDelete.id)}
						confirmText={t('remove')}
					>
						{sessionToDelete?.isCurrent
							? t('remove-current-browser-session-warning')
							: t('remove-other-browser-session-warning')}
					</ConfirmationDialog>
				)} */}

        <ConfirmationDialog
          visible={askSendConfirmation}
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
      </div>
    );
  };

  function SendDailyDealsInviteForm({
    dispensary,
  }: {
    dispensary: Dispensary;
  }) {
    const [loadingButton, setLoadingButton] = useState(false);

    const {
      resetForm,
      values,
      errors,
      touched,
      setFieldValue,
      handleBlur,
      handleChange,
      handleSubmit,
      validateForm,
    } = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        state: undefined,
        zipcode: undefined,
        birthdate: '',
        doubleOptInMessage: `Reply YES to join ${dispensary.name}.`,
      } as CustomerSMSInvite,
      onSubmit: async () => {
        try {
          setLoadingButton(true);
          const response = await axios.post<
            ResponseDataEnvelope<any>,
            AxiosResponse<ResponseDataEnvelope<any>>,
            Partial<CustomerSMSInvite>
          >(
            urlBuilder.dashboard +
              `/api/dispensaries/${team!.slug}/daily-deals/invite`,
            {
              email: values.email,
              phone: values.phone,
              firstName: values.firstName,
              lastName: values.lastName,
              city: values.city,
              state: values.state,
              zipcode: values.zipcode,
              birthdate: values.birthdate,
              doubleOptInMessage: values.doubleOptInMessage,
              teamSlug: team!.slug,
              isOptInMessages: true,
            }
          );

          if (!response.data.success || response.data.success === 'false') {
            throw new Error(response.data.error);
          }

          toast.success(`Sent invite link to ${values.firstName}!`);
          setLoadingButton(false);
          resetForm();
        } catch (error: any) {
          setLoadingButton(false);
          toast.error('An error occurred. Try again later.');
        }
      },
      validationSchema: yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        phone: yup.string().required('Phone number is required'),
        email: yup.string().email().required('Email is required'),
      }),
    });
    function notifyValidation() {
      validateForm().then((errors) => {
        if (errors && Object.values(errors).length > 0) {
          toast.error(
            Object.values(errors)[0].toString() || 'Error sending invite link'
          );
        }
      });
    }
    return (
      <div className="space-y-4 mr-auto">
        <div className="border w-full xl:hidden"></div>
        <H2 className="text-xl">{`Invite a Customer`}</H2>
        <FlexBox className="">
          <Grid className="grid-cols-2 max-w-lg gap-2">
            <Paragraph className="font-semibold col-span-2 row-span-1">
              {/* {`Send your customers an invite link to share with their friends. When their friends
					place their first order, your customer will receive a $10 credit to their account.`} */}
              {`Subscribe a customer to receive your text messages. The customer will receive a text message invite to join. 
							* Required`}
            </Paragraph>
            <TextField
              containerClassName="col-span-1"
              className="text-lg"
              name="firstName"
              label="* first name"
              placeholder="first name"
              value={values?.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              containerClassName="col-span-1"
              className="text-lg"
              name="lastName"
              label="* last name"
              placeholder="last name"
              value={values?.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.lastName && !!errors.lastName}
            />
            <TextField
              containerClassName="col-span-1"
              className="text-lg"
              name="phone"
              label="* phone"
              placeholder="phone"
              value={values?.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.phone && !!errors.phone}
            />
            <TextField
              containerClassName="col-span-1"
              className="text-lg"
              name="email"
              label="* email"
              placeholder="email"
              value={values?.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.email && !!errors.email}
            />
            <TextField
              containerClassName={'flex-1'}
              className="text-lg"
              name="city"
              label="city"
              placeholder="City"
              value={values?.city}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.city && !!errors.city}
            />
            <Select
              name="state"
              containerClassName={'flex-1'}
              label="state"
              placeholder="State"
              defaultValue={values?.state || 'NY'}
              values={usStatesAbbreviationList}
              setOption={handleChange}
            />
            <TextField
              className="text-lg"
              name="zipcode"
              label="zipcode"
              placeholder="Zipcode"
              maxLength={5}
              type={'number'}
              value={values?.zipcode || ''}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched?.zipcode && !!errors?.zipcode}
            />
            <TextField
              className="text-lg"
              name="birthdate"
              label="birthday"
              type="date"
              onChange={(e: any) => {
                const date = formatToTimeZone(
                  e.target.value,
                  TimeZoneMap[values.state || 'NY']
                );
                setFieldValue('birthdate', date);
              }}
            />
            <Paragraph className="font-medium col-span-2 pt-4">
              {`Invited customers will receive this message. 
							The customer must reply YES to join.`}
            </Paragraph>
            <TextArea
              containerClassName={'flex-1 col-span-2'}
              className="text-lg"
              name="doubleOptInMessage"
              label="Customize Your Message"
              placeholder={values.doubleOptInMessage}
              value={values?.doubleOptInMessage}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                !!touched.doubleOptInMessage && !!errors.doubleOptInMessage
              }
            />
          </Grid>
          <Button
            type="submit"
            loading={loadingButton}
            onClick={(e) => {
              try {
                isSubscribedForMessagingOrThrow(team);
                e.preventDefault();
                e.stopPropagation();
                notifyValidation();
                handleSubmit();
              } catch (error: any) {
                setShowSubscriptionMessage(true);
              }
            }}
            className="border bg-amber-100 hover:bg-amber-200 active:bg-amber-200 mx-2 my-4 px-4 place-self-end justify-self-end"
          >
            {t('send-invite')}
          </Button>
        </FlexBox>
      </div>
    );
  }

  return (
    <Page className={twMerge('bg-light mb-24 p-0 m-0 lg:p-0')}>
      <FlexBox className="relative xl:!flex-row lg:gap-x-4">
        <div>
          <FlexBox className="flex-row items-start gap-x-8">
            <PageHeader
              iconColor={'primary'}
              title={`Daily Deals`}
              Icon={ChatBubbleBottomCenterTextIcon}
            >
              <Button
                className="my-4 px-4 bg-amber-100 hover:bg-amber-200 active:bg-amber-200 place-self-start"
                onClick={() => {
                  try {
                    isSubscribedForMessagingOrThrow(team);
                    openNewDailyDealModal();
                  } catch (error: any) {
                    setShowSubscriptionMessage(true);
                  }
                }}
              >
                {`new Daily Deal`}
              </Button>
            </PageHeader>
            <Button
              onClick={openDailyDealsInfoModal}
              size="sm"
              bg="transparent"
              hover="transparent"
              className="py-6 hover:text-primary font-semibold underline place-self-start"
            >
              {`What is a daily deal?`}
            </Button>
          </FlexBox>

          <DailyDeals />

          <UpgradeAccountDialog
            visible={showSubscriptionMessage}
            title={t('upgrade-to-messaging')}
            onCancel={() => {
              setShowSubscriptionMessage(false);
            }}
            onConfirm={() => router.push(`/teams/${team.slug}/billing`)}
          >
            <>
              <Paragraph>{t('messaging-service-info')}</Paragraph>
              <Image
                src={require('public/message.png')}
                alt={t('upgrade-to-messaging')}
                className="w-full rounded"
              />
            </>
          </UpgradeAccountDialog>

          <NewDailyDealModal
            organization={team}
            modalVisible={showNewMessageModal}
            onCancel={() => {
              setShowNewMessageModal(false);
            }}
            onSubmit={mutateDailyDeals}
          />
        </div>
        <SendDailyDealsInviteForm dispensary={team} />
      </FlexBox>
    </Page>
  );
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      teamFeatures: env.teamFeatures,
    },
  };
}
