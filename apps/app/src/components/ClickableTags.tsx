import { FlexBox, Grid, Icons } from "@cd/shared-ui";
import React, { PropsWithChildren, useState } from "react";
import { Tag } from ".";
type ClickableTagProps = {
    valueKey: string;
    values: Set<any>;
    setValues: Function;
} & PropsWithChildren
function ClickableTags({ values, setValues, valueKey, children }: ClickableTagProps) {
    const [ editMode, setEditMode ] = useState(false)
    const onClick = (c: any) => {
        if (editMode) {
            setValues((state: any) => {
                let filterValues = [ ...state ].filter(item => item[ valueKey ] != c[ valueKey ])
                return new Set([ ...filterValues ])
            });
        }
        else {
            setEditMode(true);
        }
    }
    return (
    <FlexBox wrap className="min-h-[49px] pb-2">
        { [...values].map((c, index) => (
            <Tag
                key={ valueKey + "-" + index }
                Icon = { editMode && Icons.XIcon }
                onClick={() => onClick(c)}
            >
                { c[valueKey] }
            </Tag>
        ))}
    </FlexBox>
    )
}

export default ClickableTags;