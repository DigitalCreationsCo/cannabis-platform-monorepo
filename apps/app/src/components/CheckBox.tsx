function CheckBox({ name, onChange, checked }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            style={{ height: '20px', width: '30px' }}
            type="checkbox"
            name={name}
            onChange={onChange}
            checked={checked}
        />
    );
}

export default CheckBox;
