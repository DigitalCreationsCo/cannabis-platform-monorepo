import { Icons, Page } from '@cd/shared-ui';
import { twMerge } from 'tailwind-merge';
import { PageHeader } from '../src/components';

export default function Support() {
    return (
        <Page>
            <PageHeader title="Support" Icon={Icons.User2} />
            <ul className="px-8 space-y-2">
                {/* { supportFaqQuestions.map(q => <li key={ q.id }>{</li>)} */}
                {supportFaqQuestions.map((q) => (
                    <div
                        key={q.id}
                        className={twMerge('collapse collapse-arrow bg-inverse shadow rounded-full p-2 px-8')}
                    >
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">{q.question}</div>
                        <div className="collapse-content">
                            <p className="lg:px-4">{q.answer}</p>
                        </div>
                    </div>
                ))}
            </ul>
        </Page>
    );
}

const supportFaqQuestions = [
    {
        id: 1,
        question: 'What is Gras Cannabis?',
        answer: 'Gras Cannabis is a premier marijuana delivery network, serving cannabis and hemp dispensaries across 50 states.',
    },
    {
        id: 2,
        question: 'How can I start using this app in my dispensary?',
        answer: 'Sign up today. Do you need help enrolling? Dial our toll free number 888-888-8888.',
    },
    {
        id: 3,
        question: 'How will Gras help my dispensary?',
        answer: 'Dispensaries on our network typically see sale increase of 20% in their first year. Sign up today.',
    },
];
