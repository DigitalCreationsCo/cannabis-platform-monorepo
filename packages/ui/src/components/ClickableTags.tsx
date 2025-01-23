"use client"
import {
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	useState,
} from 'react';
import Icons from '../icons';
import FlexBox from './FlexBox';
import Tag from './Tag';

function ClickableTags({ values, setValues, valueKey }: ClickableTagProps) {
	const [editMode, setEditMode] = useState(false);
	const onClick = (c: any) => {
		if (editMode) {
			setValues((state: any) => {
				const filterValues = [...state].filter(
					(item) => item[valueKey] !== c[valueKey]
				);
				return new Set([...filterValues]);
			});
		} else {
			setEditMode(true);
		}
	};
	return (
		<FlexBox className="min-h-[49px] pb-2">
			{[...values].map((c, index) => (
				<Tag
					key={valueKey + '-' + index}
					Icon={editMode ? Icons.XIcon : null}
					onClick={() => onClick(c)}
				>
					{c[valueKey]}
				</Tag>
			))}
		</FlexBox>
	);
}

export default ClickableTags;

type ClickableTagProps = {
	valueKey: string;
	values: Set<Record<string, string>>;
	setValues: Dispatch<SetStateAction<Set<unknown>>>;
} & PropsWithChildren;
