import { Skeleton, Stack } from '@sanity/ui';
import React, { lazy, Suspense, useDeferredValue } from 'react';
import { type ObjectInputProps } from 'sanity';
import { height, width } from '@/components/blog/OpenGraphImage';

const OpenGraphPreview = lazy(() => import('./OpenGraphPreview'));

const RatioSkeleton = () => (
  <Skeleton
    animated
    radius={3}
    overflow={'hidden'}
    style={{
      aspectRatio: `${width} / ${height}`,
      height: '100%',
      width: '100%',
    }}
  ></Skeleton>
);

const fallback = <RatioSkeleton />;

export default function OpenGraphInput(props: ObjectInputProps) {
  const value = useDeferredValue(props.value);
  return (
    <Stack space={2}>
      <Suspense fallback={fallback}>
        {value ? <OpenGraphPreview {...(value as any)} /> : fallback}
      </Suspense>
      {props.renderDefault(props)}
    </Stack>
  );
}
