type CheckBoxProps = {
    label?: string;
    checked: boolean;
};

function CheckBox({ label, checked }: CheckBoxProps) {
    return (
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="pr-2">{label}</span>
                <input type="checkbox" checked={checked} className="checkbox checkbox-primary" />
            </label>
        </div>
    );
}

export default CheckBox;
