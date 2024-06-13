import { test, expect } from '@playwright/test';

const formValues = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  company: 'Doe Industries',
  title: 'CEO',
  phone: '1234567890',
  street: '123 Elm Street',
  city: 'Anytown',
  state: 'CA',
  zipcode: '90210',
  whichServiceInterestedIn: 'Delivery',
  serviceAreaRange: '15',
  weeklyDeliveries: '50',
  howDidYouHearAboutUs: 'Friend',
  message: 'Looking forward to working with you.',
  allowProcessResponse: true,
  subscribeCannabisInsiderNewsletter: true,
};

test('Should submit the contact form successfully', async ({ page }) => {
  await page.goto('/work-with-us');
  await expect(page).toHaveURL('/work-with-us');

  await page.fill('input[name="firstName"]', formValues.firstName);
  await page.fill('input[name="lastName"]', formValues.lastName);
  await page.fill('input[name="email"]', formValues.email);
  await page.fill('input[name="company"]', formValues.company);
  await page.fill('input[name="title"]', formValues.title);
  await page.fill('input[name="phone"]', formValues.phone);
  await page.fill('input[name="street"]', formValues.street);
  await page.fill('input[name="city"]', formValues.city);
  await page.selectOption('select[name="state"]', formValues.state);
  await page.fill('input[name="zipcode"]', formValues.zipcode);
  await page.selectOption(
    'select[name="whichServiceInterestedIn"]',
    formValues.whichServiceInterestedIn
  );

  if (formValues.whichServiceInterestedIn === 'Delivery') {
    await page.fill(
      'input[name="serviceAreaRange"]',
      formValues.serviceAreaRange
    );
    await page.fill(
      'input[name="weeklyDeliveries"]',
      formValues.weeklyDeliveries
    );
  }

  await page.selectOption(
    'select[name="howDidYouHearAboutUs"]',
    formValues.howDidYouHearAboutUs
  );
  await page.fill('textarea[name="message"]', formValues.message);

  if (formValues.allowProcessResponse) {
    await page.check('input[name="allowProcessResponse"]');
  }

  if (formValues.subscribeCannabisInsiderNewsletter) {
    await page.check('input[name="subscribeCannabisInsiderNewsletter"]');
  }

  await page.click('button[type="submit"]');

  // Wait for the success message
  await expect(
    page.locator(
      'text=Thank you for contacting us! We will reach out within 24 hours.'
    )
  ).toBeVisible();
});
