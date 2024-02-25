import {
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	useState,
} from 'react';
import Icons from '@expo/vector-icons/MaterialIcons';
import FlexBox from './FlexBox';
import Tag from './Tag';

function ClickableTags({ values, setValues, valueKey }: ClickableTagProps) {
	const [editMode, setEditMode] = useState(false);
	const onClick = (c: any) => {
		if (editMode) {
			setValues((state: any) => {
				const filterValues = [...state].filter(
					(item) => item[valueKey] !== c[valueKey],
				);
				return new Set([...filterValues]);
			});
		} else {
			setEditMode(true);
		}
	};
	return (
		<FlexBox>
			{[...values].map((c, index) => (
				<Tag
					key={valueKey + '-' + index}
					Icon={editMode ? <Icons name="close" /> : null}
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
