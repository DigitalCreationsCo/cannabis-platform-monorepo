import { Center, H3, H6, Page } from '@cd/ui-lib';

function AgeNotEnough() {
  return (
    <Page>
      <Center className="px-4 sm:w-[440px] mx-auto">
        <H3>Thank you for choosing Delivery by Gras!</H3>
        <H6>
          Unfortunately, you're not old enough to enjoy cannabis and hemp
          products, according to federal and state laws. Please come back when
          you're 21 years or older.
        </H6>
      </Center>
    </Page>
  );
}

export default AgeNotEnough;
