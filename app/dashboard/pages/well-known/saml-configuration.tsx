import { H2, Paragraph } from '@cd/ui-lib';
import type { GetServerSidePropsContext, InferGetStaticPropsType } from 'next';
import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import React, { type ReactElement } from 'react';
import InputWithCopyButton from '@/components/shared/InputWithCopyButton';
import jackson from '@/lib/jackson';
import type { NextPageWithLayout } from '@/lib/next.types';

const SPConfig: NextPageWithLayout<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ config }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <div className="mt-10 flex w-full justify-center px-5">
        <div className="w-full rounded border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 md:w-1/2">
          <div className="flex flex-col space-y-3">
            <H2 className="font-bold text-gray-700 md:text-xl">
              {t('sp-saml-config-title')}
            </H2>
            <Paragraph className="text-sm leading-6 text-gray-800">
              {t('sp-saml-config-description')}
            </Paragraph>
            <Paragraph className="text-sm leading-6 text-gray-600">
              <Trans
                i18nKey="refer-to-provider-instructions"
                t={t}
                components={{
                  guideLink: (
                    <a
                      href="https://boxyhq.com/docs/jackson/sso-providers"
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4"
                    >
                      {t('guides')}
                    </a>
                  ),
                }}
              />
            </Paragraph>
          </div>
          <div className="mt-6 flex flex-col gap-6">
            <div className="form-control w-full">
              <InputWithCopyButton
                value={config.acsUrl}
                label={t('sp-acs-url')}
              />
            </div>
            <div className="form-control w-full">
              <InputWithCopyButton
                value={config.entityId}
                label={t('sp-entity-id')}
              />
            </div>
            <div className="form-control w-full">
              <div className="flex flex-col">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                  {t('response')}
                </label>
                <Paragraph className="text-sm">{config.response}</Paragraph>
              </div>
            </div>
            <div className="form-control w-full">
              <div className="flex flex-col">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                  {t('assertion-signature')}
                </label>
                <Paragraph className="text-sm">
                  {config.assertionSignature}
                </Paragraph>
              </div>
            </div>
            <div className="form-control w-full">
              <div className="flex flex-col">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                  {t('signature-algorithm')}
                </label>
                <Paragraph className="text-sm">
                  {config.signatureAlgorithm}
                </Paragraph>
              </div>
            </div>
            <div className="form-control w-full">
              <div className="flex flex-col">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                  {t('assertion-encryption')}
                </label>
                <Paragraph className="text-sm">
                  <Trans
                    i18nKey="sp-download-our-public-cert"
                    t={t}
                    components={{
                      downloadLink: (
                        <Link
                          href="/.well-known/saml.cer"
                          className="underline underline-offset-4"
                          target="_blank"
                        >
                          {t('download')}
                        </Link>
                      ),
                    }}
                  />
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SPConfig.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export const getServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  const { spConfig } = await jackson();

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...(await serverSideTranslations(locale!, ['common'])),
      config: await spConfig.get(),
    },
  };
};

export default SPConfig;
