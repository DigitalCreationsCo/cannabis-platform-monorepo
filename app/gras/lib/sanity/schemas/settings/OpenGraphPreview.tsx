/* eslint-disable no-self-assign */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Card } from '@sanity/ui';
import { createIntlSegmenterPolyfill } from 'intl-segmenter-polyfill';
import satori, { type SatoriOptions } from 'satori';
import useSWR from 'swr/immutable';
import {
  height,
  OpenGraphImage,
  width,
} from '@/components/blog/OpenGraphImage';
import type { Settings } from '@/lib/sanity/sanity.queries';

async function init(): Promise<SatoriOptions['fonts']> {
  if ((!globalThis?.Intl as any)?.Segmenter) {
    console.debug('Polyfilling Intl.Segmenter');
    globalThis.Intl = globalThis.Intl;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    globalThis.Intl.Segmenter = await createIntlSegmenterPolyfill(
      fetch(new URL('public/break_iterator.wasm', import.meta.url))
    );
  }

  const fontData = await fetch(
    new URL(
      '@cd/ui-lib/public/fonts/EncodeSans-VariableFont_wdth,wght.ttf',
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  return [{ name: 'Inter', data: fontData, style: 'normal', weight: 700 }];
}

// preload fonts and polyfill
const fontsPromise = init();

export default function OpenGraphPreview(props: Settings['ogImage']) {
  // we wrap the segmenter setup and font loading in SWR to enable caching
  const { data: fonts } = useSWR('OpenGraphPreview.init', () => fontsPromise, {
    suspense: true,
  });

  // Also handle the satori render call in SWR to enable caching and only re-render when the title changes or fonts hot reload
  const { data: __html } = useSWR(
    [props!.title, fonts satisfies SatoriOptions['fonts']],
    ([title, fonts]) => {
      return satori(<OpenGraphImage title={title || ''} />, {
        width,
        height,
        fonts,
      });
    },
    { suspense: true }
  );

  return (
    <Card
      overflow={'hidden'}
      shadow={1}
      radius={3}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg dangerouslySetInnerHTML={{ __html }}></svg>
    </Card>
  );
}
