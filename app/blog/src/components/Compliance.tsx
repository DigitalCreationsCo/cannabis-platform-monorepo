import { selectUserState, stateMap, StatesAbbreviation } from '@cd/core-lib';
import { CopyRight, FlexBox, H2, H3, Paragraph, Select } from '@cd/ui-lib';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../redux/hooks';

export default function Compliance() {
	const { user } = useAppSelector(selectUserState);

	function getUserAddressStateAbbrev() {
		const userAddressState = user.address?.[0]?.state;
		return (
			userAddressState && stateMap[userAddressState.toUpperCase()]?.abbreviation
		);
	}
	const defaultStateAbbrev = () =>
		getUserAddressStateAbbrev() || StatesAbbreviation[0];

	const [stateAbbrev, setStateAbbrev] = useState(defaultStateAbbrev());
	const selectedState = useMemo(
		() =>
			Object.keys(stateMap).find(
				(state) => stateMap[state].abbreviation === stateAbbrev && stateAbbrev,
			),
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
					values={StatesAbbreviation}
					defaultValue={defaultStateAbbrev()}
					setOption={setStateAbbrev}
				/>
			</FlexBox>
			<div id="compliance-sheet" className="min-h-[420px]">
				<H3 className="uppercase underline">{selectedState + ' Compliance'}</H3>
			</div>
			<CopyRight />
		</div>
	);
}
