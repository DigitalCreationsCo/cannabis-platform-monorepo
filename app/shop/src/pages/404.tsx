import { ErrorMessage, LayoutContextProps, Page } from '@cd/ui-lib';

function _404({ code }: { code: number }) {
  return (
    <Page>
      <ErrorMessage
        code={code}
        message={`This resource is not found.  
                   Please try again later, or call our support phone number. Thank you.`}
      />
    </Page>
  );
}

_404.getLayoutContext = (): LayoutContextProps => ({
  showHeader: false,
});

export default _404;
