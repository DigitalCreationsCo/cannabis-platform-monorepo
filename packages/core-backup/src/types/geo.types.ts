import { type USStateAbbreviated } from '@gras/data-access';

/* eslint-disable @typescript-eslint/naming-convention */
export type StateMap = Record<
	string,
	{ abbreviation: USStateAbbreviated; legalAge: number }
>;
