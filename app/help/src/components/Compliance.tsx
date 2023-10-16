import { selectUserState, stateMap } from '@cd/core-lib';
import {
	Collapse,
	CopyRight,
	FlexBox,
	H2,
	H3,
	LoadingDots,
	Paragraph,
	Select,
} from '@cd/ui-lib';
import { Suspense, useMemo, useState } from 'react';
import { useAppSelector } from '../redux/hooks';

export const StatesAbbreviationList = [
	'AL',
	'AK',
	'AZ',
	'AR',
	'CA',
	'CO',
	'CT',
	'DE',
	'FL',
	'GA',
	'HI',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MD',
	'MA',
	'MI',
	'MN',
	'MS',
	'MO',
	'MT',
	'NE',
	'NV',
	'NH',
	'NJ',
	'NM',
	'NY',
	'NC',
	'ND',
	'OH',
	'OK',
	'OR',
	'PA',
	'RI',
	'SC',
	'SD',
	'TN',
	'TX',
	'UT',
	'VT',
	'VA',
	'WA',
	'WV',
	'WI',
	'WY',
];

export default function Compliance() {
	const { user } = useAppSelector(selectUserState);

	function getUserAddressState() {
		return user.address?.[0]?.state;
	}
	const defaultStateAbbrev = () =>
		stateMap[getUserAddressState().toUpperCase()]?.abbreviation ||
		StatesAbbreviationList[0];
	const [stateAbbrev, setStateAbbrev] = useState(defaultStateAbbrev());

	const selectedState = useMemo<string>(
		() =>
			Object.keys(stateMap).find(
				(state) => stateMap[state].abbreviation === stateAbbrev && stateAbbrev,
			) as string,
		[stateAbbrev],
	);

	return (
		<div className="mx-auto md:self-start lg:mx-0">
			<H2 className="text-primary">
				Search Cannabis Federal And State Regulations
			</H2>
			<FlexBox className="flex-row items-center">
				<Paragraph className="text-lg">STATE</Paragraph>
				<Select
					className="rounded border text-lg"
					values={StatesAbbreviationList}
					defaultValue={defaultStateAbbrev()}
					setOption={setStateAbbrev}
				/>
			</FlexBox>
			<div id="compliance-sheet" className="min-h-[420px]">
				<H3 className="uppercase underline">{selectedState + ' Compliance'}</H3>
				{renderComplianceSheet(selectedState)}
			</div>
			<CopyRight />
		</div>
	);
}

function renderComplianceSheet(state: typeof StatesAbbreviationList[number]) {
	console.info('renderComplianceSheet state: ', state);
	// const response = axios.get<ComplianceDataSheet>(
	// 	process.env.NEXT_PUBLIC_SERVER_MAIN_URL +
	// 		`/api/v1/compliance/state=${state}`,
	// );
	// console.info('renderComplianceSheet response: ', response);

	return (
		<Suspense fallback={<LoadingDots />}>
			<Paragraph>select a topic to expand</Paragraph>
			<ComplianceSheet data={mockComplianceDataSheet} />
		</Suspense>
	);
}

function ComplianceSheet({ data }: { data: ComplianceDataSheet }) {
	return (
		<div>
			{data &&
				Object.keys(data).map((key, index) => (
					<Collapse
						key={`compliance-sheet-topic-${index}`}
						item={{
							q: data[key as keyof typeof ComplianceSheet]['title'],
							value: '',
						}}
					/>
				))}
		</div>
	);
}
const mockComplianceDataSheet: ComplianceDataSheet = {
	license: {
		title: 'License',
		license_types: {
			q: 'What license types are available?',
			types: 'dispensary',
		},
	},
	transport: {
		title: 'Transport',
		transport_hours: {
			q: 'What hours can cannabis be legally transported?',
			start: 8,
			end: 20,
		},
		transport_logs: {
			q: 'Are transport manifests required?',
			value: 'required',
		},
		transport_staff: {
			q: 'How many employees travel in the transport vehicle?',
			value: 1,
		},
		transport_storage: {
			q: 'Must the cannabis product be locked to transport?',
			value: 'locked',
		},
		transport_weight_limit: {
			q: 'What is the maximum weight of cannabis that can be transported?',
			value: 100,
		},
	},
	sale: {
		title: 'Sale',
		age_limit: {
			q: 'What is the minimum age to purchase cannabis?',
			value: 21,
		},
		thc_sale_limit: {
			q: 'What is the maximum percentage THC content allowed for sale?',
			value: 21,
		},
		sale_weight_limit: {
			q: 'What is the maximum weight of cannabis that can be sold?',
			value: 2400,
		},
	},
};

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

export type ComplianceLicense = ComplianceDataSheet['license']['license_types'];
export type ComplianceLicenseType =
	ComplianceDataSheet['license']['license_types']['types'];
export type ComplianceTransportWeightLimit =
	ComplianceDataSheet['transport']['transport_weight_limit'];
export type ComplianceTransportHours =
	ComplianceDataSheet['transport']['transport_hours'];
export type ComplianceSaleThcLimit =
	ComplianceDataSheet['sale']['thc_sale_limit'];
export type ComplianceSaleWeightLimit =
	ComplianceDataSheet['sale']['sale_weight_limit'];
