import { stateMap, type StateAbbreviationType, type USStateType } from '@cd/core-lib';

// this class provides a dynamic regex based on the united states drivers license format
// also, has a method to check if age is legal

/** Class used to parse text from an image of a united states drivers license or id card,
 * and verify the data from the image
 *
 * @private {string} text - text parsed from an image of a united states drivers license or id card
 * @private {State} _stateName - the name of the state the id card was issued from
 * @private {StateAbbreviation} _stateAbbreviation - the abbreviation of the state the id card was issued from
 *
 * @method {State} getIssuedState - returns the state the id card was issued from
 */
export default class IdCardReader {
	private _text: string;
	private _stateName: USStateType;
	private _stateAbbreviation: StateAbbreviationType;

	constructor(text: string, state?: USStateType) {
		this._text = text;
		this._stateName = state || this.getIssuedState();
		this._stateAbbreviation = stateMap[this._stateName].abbreviation;
	}

	isLegalAge() {
		const _dob = this.getDateOfBirth(),
			_isLegalAge = this.checkLegalAge(_dob);
		return {
			scannedDOB: _dob,
			isLegalAge: _isLegalAge,
		};
	}

	private checkLegalAge(dateOfBirth: Date): boolean {
		const now = new Date(),
			diff = now.getTime() - dateOfBirth.getTime(),
			years = diff / (1000 * 60 * 60 * 24 * 365.25),
			stateLegalAge = stateMap[this._stateName].legalAge,
			isLegalAge = years >= stateLegalAge;

		console.info(' detected isLegalAge: ', isLegalAge);
		return isLegalAge;
	}

	private getDateOfBirth(): Date {
		const dobRegex = this.getDOBRegex(),
			dates = this._text.match(dobRegex);

		if (dates && dates.length > 0) {
			console.info('dates found: ', dates);
			// reduce to the oldest date - assumed to be the date of birth
			const dateOfBirth: Date = dates.reduce((oldestDate, date) => {
				const _date = new Date(date);
				if (_date < oldestDate) return _date;
				else return oldestDate;
			}, new Date());

			console.info(' detected date of birth: ', dateOfBirth);
			return dateOfBirth;
		} else throw new Error('No date of birth detected');
	}

	getIssuedState() {
		const stateName = Object.keys(stateMap).find((state) =>
			this._text.toUpperCase().match(state),
		);

		if (!stateName) throw new Error(`Invalid state name: ${stateName}`);

		return stateName as USStateType;
	}

	// private method
	private getDOBRegex() {
		// ALL STATES ARE TEMPLATES! except:
		// Maryland
		// Pennsylvania

		// TESTED STATES:
		// Maryland
		switch (this._stateAbbreviation) {
			case 'AL':
				return /\bAL\b/gi;
			case 'AK':
				return /\bAK\b/gi;
			case 'AZ':
				return /\bAZ\b/gi;
			case 'AR':
				return /\bAR\b/gi;
			case 'CA':
				return /\bCA\b/gi;
			case 'CO':
				return /\bCO\b/gi;
			case 'CT':
				return /\bCT\b/gi;
			case 'DE':
				return /\bDE\b/gi;
			case 'FL':
				return /\bFL\b/gi;
			case 'GA':
				return /\bGA\b/gi;
			case 'HI':
				return /\bHI\b/gi;
			case 'ID':
				return /\bID\b/gi;
			case 'IL':
				return /\bIL\b/gi;
			case 'IN':
				return /\bIN\b/gi;
			case 'IA':
				return /\bIA\b/gi;
			case 'KS':
				return /\bKS\b/gi;
			case 'KY':
				return /\bKY\b/gi;
			case 'LA':
				return /\bLA\b/gi;
			case 'MA':
				return /\bMA\b/gi;
			case 'ME':
				return /\bME\b/gi;

			case 'MD':
				return /\d{2}\/\d{2}\/\d{4}/gi;

			case 'MI':
				return /\bMI\b/gi;
			case 'MN':
				return /\bMN\b/gi;
			case 'MS':
				return /\bMS\b/gi;
			case 'MO':
				return /\bMO\b/gi;
			case 'MT':
				return /\bMT\b/gi;
			case 'NE':
				return /\bNE\b/gi;
			case 'NV':
				return /\bNV\b/gi;
			case 'NH':
				return /\bNH\b/gi;
			case 'NJ':
				return /\bNJ\b/gi;
			case 'NM':
				return /\bNM\b/gi;
			case 'NY':
				return /\bNY\b/gi;
			case 'NC':
				return /\bNC\b/gi;
			case 'ND':
				return /\bND\b/gi;
			case 'OH':
				return /\bOH\b/gi;
			case 'OK':
				return /\bOK\b/gi;
			case 'OR':
				return /\bOR\b/gi;

			case 'PA':
				return /([DOB]+\S\s\d+)/g;

			case 'RI':
				return /\bRI\b/gi;
			case 'SC':
				return /\bSC\b/gi;
			case 'SD':
				return /\bSD\b/gi;
			case 'TN':
				return /\bTN\b/gi;
			case 'TX':
				return /\bTX\b/gi;
			case 'UT':
				return /\bUT\b/gi;
			case 'VT':
				return /\bVT\b/gi;
			case 'VA':
				return /\bVA\b/gi;
			case 'WA':
				return /\bWA\b/gi;
			case 'WV':
				return /\bWV\b/gi;
			case 'WI':
				return /\bWI\b/gi;
			case 'WY':
				return /\bWY\b/gi;
			default:
				return undefined;
		}
	}
}