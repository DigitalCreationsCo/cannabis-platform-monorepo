import {
	axios,
	selectUserState,
	usStatesAbbreviationList,
	stateMap,
	useAppSelector,
	renderNestedDataObject,
} from '@cd/core-lib';
import { type USStateAbbreviated } from '@cd/data-access';
import {
	CopyRight,
	FlexBox,
	H2,
	H3,
	LoadingDots,
	Paragraph,
	Select,
	ErrorBoundary,
	Center,
} from '@cd/ui-lib';
import { Suspense, useMemo, useState } from 'react';
import useSWR from 'swr';

export default function Compliance() {
	const { user } = useAppSelector(selectUserState);

	function getUserAddressState() {
		return user.address?.[0]?.state as USStateAbbreviated;
	}
	const defaultStateAbbrev = () =>
		stateMap[getUserAddressState()?.toUpperCase()]?.abbreviation ||
		usStatesAbbreviationList[0];

	const [stateAbbrev, setStateAbbrev] = useState(defaultStateAbbrev());

	const selectedState = useMemo<string>(
		() =>
			Object.keys(stateMap).find(
				(state) => stateMap[state].abbreviation === stateAbbrev && stateAbbrev
			) as string,
		[stateAbbrev]
	);

	function ComplianceSheet() {
		const { data } = useSWR(
			process.env.NEXT_PUBLIC_SERVER_MAIN_URL +
				`/api/v1/compliance/state=${stateAbbrev}`,
			(url) =>
				axios
					.get<{ success: 'true' | 'false'; payload: ComplianceDataSheet }>(url)
					.then((res) => res.data),
			{ suspense: true }
		);
		const renderDataComplianceSheet = () =>
			(data?.success === 'true' && (
				<>
					{renderNestedDataObject(data.payload, Paragraph, {
						removeFields: ['id', 'createdAt', 'state', 'updatedAt'],
						sort: 'asc',
					})}
				</>
			)) || (
				<Center>
					<Paragraph>We didn't find the compliance record</Paragraph>
				</Center>
			);
		return (
			<div className="flex min-h-full flex-col">
				{renderDataComplianceSheet()}
			</div>
		);
	}

	return (
		<div className="mx-auto md:self-start">
			<H2 className="text-primary">
				Search Cannabis Federal And State Regulations
			</H2>
			<FlexBox className="flex-row items-center gap-2">
				<Paragraph className="text-lg">STATE</Paragraph>
				<Select
					values={usStatesAbbreviationList}
					defaultValue={defaultStateAbbrev()}
					setOption={setStateAbbrev}
				/>
			</FlexBox>
			<div
				id="compliance-sheet"
				className="flex min-h-[420px] flex-col sm:items-center"
			>
				<H3 className="uppercase underline">{selectedState + ' Compliance'}</H3>
				<ErrorBoundary
					fallback={
						<Center className="">
							<Paragraph>An error occurred. Try again.</Paragraph>
						</Center>
					}
				>
					<Suspense
						fallback={
							<Center className="">
								<LoadingDots />
							</Center>
						}
					>
						<ComplianceSheet />
					</Suspense>
				</ErrorBoundary>
			</div>
			<CopyRight />
		</div>
	);
}

// const mockComplianceDataSheet: ComplianceDataSheet = {
// 	license: {
// 		title: 'License',
// 		license_types: {
// 			q: 'What license types are available?',
// 			types: 'dispensary',
// 		},
// 	},
// 	transport: {
// 		title: 'Transport',
// 		transport_hours: {
// 			q: 'What hours can cannabis be legally transported?',
// 			start: 8,
// 			end: 20,
// 		},
// 		transport_logs: {
// 			q: 'Are transport manifests required?',
// 			value: 'required',
// 		},
// 		transport_staff: {
// 			q: 'How many employees travel in the transport vehicle?',
// 			value: 1,
// 		},
// 		transport_storage: {
// 			q: 'Must the cannabis product be locked to transport?',
// 			value: 'locked',
// 		},
// 		transport_weight_limit: {
// 			q: 'What is the maximum weight of cannabis that can be transported?',
// 			value: 100,
// 		},
// 	},
// 	sale: {
// 		title: 'Sale',
// 		age_limit: {
// 			q: 'What is the minimum age to purchase cannabis?',
// 			value: 21,
// 		},
// 		thc_sale_limit: {
// 			q: 'What is the maximum percentage THC content allowed for sale?',
// 			value: 21,
// 		},
// 		sale_weight_limit: {
// 			q: 'What is the maximum weight of cannabis that can be sold?',
// 			value: 2400,
// 		},
// 	},
// };

type ComplianceDataSheet = {
	license: {
		title: string;
		license_types: {
			q: string;
			types:
				| 'dispensary'
				| 'delivery'
				| 'process'
				| 'cultivation'
				| 'transport';
		};
	};
	transport: {
		title: string;
		transport_weight_limit: {
			q: string;

			value: number;
		};
		transport_hours: {
			q: string;

			start: number;
			end: number;
		};
		transport_storage: {
			q: string;
			value: 'locked' | 'unlocked';
		};
		transport_logs: {
			q: string;
			value: 'required';
		};
		transport_staff: {
			q: string;
			value: 1 | 2;
		};
	};
	sale: {
		title: string;
		age_limit: {
			q: string;
			value: 21;
		};
		thc_sale_limit: {
			q: string;
			value: number;
		};
		sale_weight_limit: {
			q: string;
			value: number;
		};
	};
};

export type GrasRegulationResponsibility = {
	verify_customer_id: boolean;
	record_sales: 'required';
};

// function wrapPromise(promise: Promise<any>) {
// 	let status: 'pending' | 'error' | 'default' = 'pending';
// 	let response: any;
// 	const suspender = promise.then(
// 		(res) => {
// 			status = 'default';
// 			response = res;
// 		},
// 		(err) => {
// 			status = 'error';
// 			response = err;
// 		},
// 	);
// 	const handler = {
// 		pending: () => {
// 			throw suspender;
// 		},
// 		error: () => {
// 			throw response;
// 		},
// 		default: () => response,
// 	};
// 	const read = () => {
// 		return handler[status] ? handler[status]() : handler.default();
// 	};
// 	return { read };
// }
