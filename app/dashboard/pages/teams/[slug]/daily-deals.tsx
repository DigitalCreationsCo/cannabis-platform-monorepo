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
} from '@cd/ui-lib';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { type AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { Error as ErrorComponent } from '@/components/shared';
import { wrapper } from '@/lib/store';

const dailyDealsInfo = `Daily Deals are a great way to promote your business to your customers.
Messages are sent to your customers via text message. 

Use daily deals to promote products or promote events.

Schedule Daily Deals, or send a one-time message.`;

export default function DailyDealsPage() {
  // const { user, organization, products, orders, dailyDeals } =
  const dispatch = useAppDispatch();
  const { isLoading, isError, team } = useDispensary();
  const { t } = useTranslation('common');

  const { data } = useSWR<ApiResponse<DailyDeal[]>>(
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
    dispatch(
      modalActions.openModal({
        modalVisible: true,
        modalType: modalTypes.NewDailyDealModal,
        organization: team,
      })
    );
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

  const DailyDeals = () => (
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
      <Grid className="flex grow flex-col md:flex-row gap-2 flex-wrap">
        {dailyDeals?.length ? (
          dailyDeals.map((deal, index) => (
            <div
              key={`daily-deal-${index + 1}`}
              className="border rounded w-[386px] h-[186px] p-4"
            >
              <FlexBox className="w-full flex-row justify-between">
                <Paragraph>
                  {deal.title}
                  <br />
                  {deal.startTime
                    ? `starts ${showTime(deal.startTime)} ${showDay(
                        deal.startTime
                      )}`
                    : null}
                </Paragraph>
                <FlexBox>
                  <Paragraph className="text-red-800">
                    {deal.endTime &&
                    Date.now() > Number(deal.endTime.toUTCString)
                      ? 'expired'
                      : 'active' || ''}
                  </Paragraph>
                </FlexBox>
              </FlexBox>
            </div>
          ))
        ) : (
          <Paragraph>{`You have no deals. Try adding one.`}</Paragraph>
        )}
      </Grid>
    </div>
  );

  return (
    <div className={twMerge('bg-light lg:min-h-[710px] pb-4 lg:pb-24')}>
      <FlexBox className="relative xl:flex-row lg:gap-x-16">
        <div>
          <FlexBox className="flex-row items-start gap-x-8">
            <PageHeader
              iconColor={'primary'}
              title={`Daily Deals`}
              Icon={ChatBubbleBottomCenterTextIcon}
            >
              <Button
                className="my-4 px-4 bg-amber-100 hover:bg-amber-200 active:bg-amber-200 place-self-start"
                onClick={openNewDailyDealModal}
              >
                {`new Daily Deal`}
              </Button>
            </PageHeader>
            <Button
              onClick={openDailyDealsInfoModal}
              size="sm"
              bg="transparent"
              hover="transparent"
              className="hover:text-primary font-semibold underline place-self-start"
            >
              {`What is a daily deal?`}
            </Button>
          </FlexBox>

          <DailyDeals />
        </div>
        <SendDailyDealsInviteForm dispensary={team} />
      </FlexBox>
    </div>
  );
}

function SendDailyDealsInviteForm({ dispensary }: { dispensary: Dispensary }) {
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
          CustomerSMSInvite
        >(urlBuilder.dashboard + '/api/daily-deals/invite', {
          email: values.email,
          phone: values.phone,
          firstName: values.firstName,
          lastName: values.lastName,
          city: values.city,
          state: values.state,
          zipcode: values.zipcode,
          birthdate: values.birthdate,
          doubleOptInMessage: values.doubleOptInMessage,
        });

        if (!response.data.success || response.data.success === 'false') {
          throw new Error(response.data.error);
        }

        toast.success(`Sent invite link to ${values.firstName}!`);
        setLoadingButton(false);
        resetForm();
      } catch (error: any) {
        console.error('send invite link: ', error);
        setLoadingButton(false);
        toast.error(error.message);
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

  const [editDiscountCode, setEditDiscountCode] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  return (
    <div className="space-y-4">
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
            error={!!touched.doubleOptInMessage && !!errors.doubleOptInMessage}
          />
        </Grid>
        <Button
          type="submit"
          loading={loadingButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            notifyValidation();
            handleSubmit();
          }}
          className="border bg-amber-100 hover:bg-amber-200 active:bg-amber-200 mx-2 my-4 px-4 place-self-end justify-self-end"
        >
          {`Send Invite`}
        </Button>
      </FlexBox>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (): any => async () => {
    // const response = await axios.get<ResponseDataEnvelope<DailyDeal[]>>(
    // 	urlBuilder.dashboard + '/api/daily-deals',
    // 	{
    // 		headers: {
    // 			'organization-id': query.dashboard,
    // 			Authorization: `Bearer ${session.getAccessToken()}`,
    // 		},
    // 	},
    // );

    // if (!response.data.success || response.data.success === 'false')
    // 	throw new Error(response.data.error);

    // const dailyDeals = response.data.payload;

    return {
      props: { dailyDeals: [] },
    };
  }
);
