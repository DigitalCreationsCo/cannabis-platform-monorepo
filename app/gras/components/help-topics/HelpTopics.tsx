import { FAQ } from '@cd/ui-lib';
import AboutGras from './AboutGras';
import Compliance from './Compliance';
import HowToOrder from './HowToOrder';
import DispensaryTermsAndConditions from './legal/DispensaryTermsAndConditions';
import DriverTermsAndConditions from './legal/DriverTermsAndConditions';
import PrivacyPolicy from './legal/PrivacyPolicy';
import UserTermsAndConditions from './legal/UserTermsAndConditions';
import WidgetInstallGuide from './WidgetInstallGuide';

export const helpTopics = {
	'about-gras': { title: 'About Gras', component: AboutGras },
	faq: { title: 'FAQ', component: FAQ },
	'install-guide': { title: 'Install Guide', component: WidgetInstallGuide },
	'how-to-order': { title: 'How To Order', component: HowToOrder },
	compliance: { title: 'Compliance', component: Compliance },
	'privacy-policy': { title: 'Privacy Policy', component: PrivacyPolicy },
	'dispensary-terms-and-conditions': {
		title: 'Dispensary Terms and Conditions',
		component: DispensaryTermsAndConditions,
	},
	'user-terms-and-conditions': {
		title: 'User Terms and Conditions',
		component: UserTermsAndConditions,
	},
	'driver-terms-and-conditions': {
		title: 'Driver Terms and Conditions',
		component: DriverTermsAndConditions,
	},
};
