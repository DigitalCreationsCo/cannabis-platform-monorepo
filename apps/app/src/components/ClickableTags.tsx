import { FlexBox, Grid, Icons } from "@cd/shared-ui";
import React, { PropsWithChildren, useState } from "react";
import { Tag } from ".";
type ClickableTagProps = {
    valueKey: string;
    values: any[];
    setValues: Function;
    removeFunc: any;
} & PropsWithChildren
function ClickableTags({ values, setValues, valueKey, removeFunc, children }: ClickableTagProps) {
    const [ editMode, setEditMode ] = useState(false)
    const onClick = (c: any) => {
        if (editMode) {
            setValues((state: typeof values) => state.filter(item => item[ valueKey ] !== c[ valueKey ]));
        }
        else {
            setEditMode(true);
        }
    }
    return (
    <FlexBox>
        { values.map((c) => (
            <Tag
                key={ valueKey + "-" + c }
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