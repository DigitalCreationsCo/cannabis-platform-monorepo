/* eslint-disable i18next/no-literal-string */
import { Button, FlexBox, H1, Paragraph, styles } from '@cd/ui-lib';
import { twMerge } from 'tailwind-merge';
import { CTA } from '..';
import Image from 'next/image';
import messageImg from '../../../public/message-1.png';
import Link from 'next/link';

function Hero() {
  const [heading, largeHeading] = [
    'tracking-normal !leading-tight font-bold text-inverse-soft text-5xl lg:text-6xl xl:text-6xl drop-shadow-[0px_3px_1px_#444]',
    'tracking-normal bg-clip-text text-transparent bg-gradient-to-b from-secondary-light to-primary-light inline whitespace-pre-line text-6xl font-bold md:text-7xl drop-shadow-[0px_3px_1px_#444444] lg:text-8xl xl:text-8xl md:drop-shadow-[1px_-5px_1px_#666666]',
  ];
  return (
    <section
      id="messaging"
      className={twMerge(
        'bg-gradient-to-b',
        'from-secondary',
        'to-primary',
        'py-8 pb-16 md:pt-16'
      )}
    >
      <FlexBox className="flex-col md:flex-row justify-center items-center md:items-start gap-x-8 mx-auto px-16 py-4">
        <FlexBox className="flex-1 justify-center items-center max-w-2xl">
          <div
            className={twMerge('sm:' + styles.textShadow, 'space-y-4 mx-auto')}
          >
            <H1
              className={twMerge(heading, 'text-left max-w-fit mx-auto')}
            >{`Personalized Text Messaging Service Made For Cannabis Businesses`}</H1>
          </div>
          <div className="sm:my-0 mx-auto grid py-6 place-self-center text-left gap-y-8 mt-0">
            <Paragraph className="text-light font-encode mx-auto tracking-loose text-xl lg:text-2xl whitespace-pre-line">
              {`Build deeper customer relationships with a messaging service based on choice, quality and trust.`}
            </Paragraph>
            <FlexBox className="w-full py-8 sm:flex-row gap-8 items-center">
              <CTA cta={'Get Started'} href={'/auth/join'} />
              <Link
                className="w-[240px px-8 underline text-light pb-2 uppercase"
                href={'#info'}
                scroll={false}
              >
                <Paragraph className="text-lg font-medium">
                  {`Learn More`}
                </Paragraph>
              </Link>
            </FlexBox>
          </div>
        </FlexBox>
        <Image
          src={messageImg}
          alt={`consumer-messaging`}
          className="rounded bg-inverse shadow-lg object-cover max-w-sm lg:max-w-md flex-1 md:mt-8"
        />
      </FlexBox>
    </section>
  );
}

export default Hero;
