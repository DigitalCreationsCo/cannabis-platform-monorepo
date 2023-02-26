import { FlexBox, Label, Paragraph } from '@cd/shared-ui';

function CheckBox({
    name,
    onChange,
    checked,
    helperText,
    description
}: { helperText?: string; description?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    const styles = {
        checkboxContainer: 'flex-row items-center space-x-1 py-8 md:py-2 m-auto self-center md:self-start'
    };
    return (
        <FlexBox className={styles.checkboxContainer}>
            <input
                style={{ height: '20px', width: '30px' }}
                type="checkbox"
                name={name}
                onChange={onChange}
                checked={checked}
            />
            <Label>{helperText}</Label>
            <Paragraph>{description}</Paragraph>
        </FlexBox>
    );
}

export default CheckBox;
