import { FlexBox, Paragraph, IconWrapper, H5, styles, H2 } from '@cd/ui-lib';
import Image from 'next/image';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { CTA } from '../index';
import { type BenefitData } from './benefit-data';

interface BenefitsProps extends HTMLAttributes<HTMLDivElement> {
  data: BenefitData;
  imagePosition?: 'left' | 'right';
  orientation?: 'row' | 'col';
  values?: number[];
  valueColor?: string;
}

export default function Benefits({
  data,
  imagePosition = 'right',
  orientation: ornt = 'col',
  values,
  valueColor = 'text-dark',
  ...props
}: BenefitsProps) {
  const orientation = ornt === 'row' ? 'flex-row' : 'flex-col';
  return (
    <div
      id={props.id}
      className={twMerge(
        'relative bg-inverse',
        'py-20 pb-28',
        'gap-8',
        `${data.image && imagePosition === 'right' ? 'lg:justify-end' : ''}`,
        props.className
      )}
    >
      <FlexBox
        className={twMerge(
          'flex flex-col flex-wrap items-center justify-center gap-4'
        )}
      >
        {data.title && (
          <H2
            className={twMerge(
              styles.textShadow,
              'text-center text-5xl font-bold leading-snug max-w-lg md:max-w-6xl lg:text-6xl lg:leading-tight whitespace-pre-line'
            )}
          >
            {data.title}
          </H2>
        )}
        {data.description && (
          <Paragraph className="font-encode font-semibold text-center max-w-md lg:max-w-3xl mx-auto text-2xl">
            {data.description}
          </Paragraph>
        )}
        <FlexBox
          className={twMerge(
            'flex flex-col lg:flex-row flex-wrap items-center justify-center gap-8 py-8'
          )}
        >
          {data.bullets.length > 0 && (
            <FlexBox
              className={twMerge(
                'max-w-md',
                'gap-y-8 justify-around',
                'xl:' + orientation
              )}
            >
              {data.bullets.map((item: any, index: any) => (
                <Benefit
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  description={item.description}
                  value={values && values[index]}
                  valueColor={valueColor}
                />
              ))}
            </FlexBox>
          )}

          {data.image && (
            <div
              className={`max-w-lg flex items-center justify-center -order-1 lg:order-1 ${
                imagePosition === 'right' ? 'lg:order-1' : 'lg:-order-1'
              }`}
            >
              <Image
                height={400}
                className="bg-inverse shadow-lg rounded object-cover"
                src={data.image}
                alt="Benefits"
                placeholder="blur"
                blurDataURL={data.image.toString()}
              />
            </div>
          )}
        </FlexBox>
        <>{props.children}</>
        {(data.cta && <CTA cta={data.cta} />) || <></>}
      </FlexBox>
    </div>
  );
}

export function Benefit(
  props: BenefitData['bullets'][number] & {
    value?: number;
    valueColor?: string;
  }
) {
  return (
    <div className="m-auto w-full flex flex-col max-w-[440px] px-2 items-center space-x-3">
      <FlexBox className="w-full flex-row items-center gap-4">
        <div className="flex h-11 w-11 shadow-lg shrink-0 items-center justify-center rounded-md bg-orange-300">
          <IconWrapper iconSize={32} Icon={props.icon} />
        </div>
        <div>
          <H5 className="text-2xl whitespace-nowrap font-semibold">
            {props.title}
            <span className={props.valueColor}>
              {props.value && ` ($${props.value} value)`}
            </span>
          </H5>
          {props.description && (
            <Paragraph className="text-dark mt-1 text-2xl">
              {props.description}
            </Paragraph>
          )}
        </div>
      </FlexBox>
    </div>
  );
}
