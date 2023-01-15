import { FlexBox, Icons } from '@cd/shared-ui';
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { Tag } from '.';
type ClickableTagProps = {
    valueKey: string;
    values: Set<unknown>;
    setValues: Dispatch<SetStateAction<Set<unknown>>>;
} & PropsWithChildren;
function ClickableTags({ values, setValues, valueKey }: ClickableTagProps) {
    const [editMode, setEditMode] = useState(false);
    const onClick = (c: any) => {
        if (editMode) {
            setValues((state: any) => {
                const filterValues = [...state].filter((item) => item[valueKey] !== c[valueKey]);
                return new Set([...filterValues]);
            });
        } else {
            setEditMode(true);
        }
    };
    return (
        <FlexBox wrap className="min-h-[49px] pb-2">
            {[...values].map((c, index) => (
                <Tag key={valueKey + '-' + index} Icon={editMode && Icons.XIcon} onClick={() => onClick(c)}>
                    {c[valueKey]}
                </Tag>
            ))}
        </FlexBox>
    );
}

export default ClickableTags;
