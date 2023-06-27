import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tiny } from './Typography';

type PageProps = {
  gradient?: 'pink' | 'green';
  className?: string | string[];
};

function Page({
  gradient,
  children,
  className = '',
}: PropsWithChildren<PageProps>) {
  const appVersion = '0.1.0';

  type Styles = (string | string[])[];
  const styles: Styles = Object.values({
    page: [
      'bg-inverse-soft',
      'flex flex-col grow',
      'min-w-screen',
      'sm:px-4',
      'md:pt-8 pb-24',
      'lg:px-16',
    ],
    gradient: [(gradient && 'anim8-' + gradient + '-gradient') || ''],
    cursor: ['cursor-default'],
    // hideOverflow: ['overflow-hidden'],

    className,
  });

  return (
    <div className={twMerge(styles)}>
      {children}

      <div className="fixed flex items-center bottom-0 right-0 cursor-default text-accent-soft space-x-1 pr-1">
        <div
          className={twMerge([
            'hidden',
            process.env.NEXT_PUBLIC_IS_LOCAL == '1' && 'flex items-center',
          ])}
        >
          <Tiny>localhost</Tiny>
        </div>
        <Tiny>{appVersion}</Tiny>
      </div>
    </div>
  );
}

export default Page;
