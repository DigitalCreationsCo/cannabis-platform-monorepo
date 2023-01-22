import Select from '../Select';

type DialCodeSelectProps = {
    className?: string;
};
export default function DialCodeSelect({ className }: DialCodeSelectProps) {
    return (
        <div className="w-fit">
            <Select className={className} options={dialCodeOptions}></Select>
        </div>
    );
}

const dialCodeOptions = [
    {
        label: 'USA',
        value: '+1',
    },
];
