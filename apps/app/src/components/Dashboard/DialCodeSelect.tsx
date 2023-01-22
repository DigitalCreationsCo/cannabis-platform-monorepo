import Select from '../Select';

type DialCodeSelectProps = {
    className?: string;
};
export default function DialCodeSelect({ className }: DialCodeSelectProps) {
    return <Select className={className} options={dialCodeOptions}></Select>;
}

const dialCodeOptions = [
    {
        label: 'USA',
        value: '+1',
    },
];
