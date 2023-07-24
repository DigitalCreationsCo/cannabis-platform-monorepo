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
    private _stateName: USState;
    private _stateAbbreviation: StateAbbreviation;

    constructor(text: string, state?: USState) {
        this._text = text;
        this._stateName = state || this.getIssuedState();
        this._stateAbbreviation = stateMap[this._stateName].abbreviation;
    }

    isLegalAge() {
        const
            _dob = this.getDateOfBirth(),
            _isLegalAge = this.checkLegalAge(_dob)
        return {
            scannedDOB: _dob,
            isLegalAge: _isLegalAge
        };
    }

    private checkLegalAge(dateOfBirth: Date): boolean {
        const
            now = new Date(),
            diff = now.getTime() - dateOfBirth.getTime(),
            years = diff / (1000 * 60 * 60 * 24 * 365.25),

            stateLegalAge = stateMap[this._stateName].legalAge,
            isLegalAge = years >= stateLegalAge;

        console.info(' detected isLegalAge: ', isLegalAge);
        return isLegalAge;
    }

    private getDateOfBirth(): Date {
        const
            dobRegex = this.getDOBRegex(),
            dates = this._text.match(dobRegex);

        if (dates && dates.length > 0) {
            console.info('dates found: ', dates);
            // reduce to the oldest date - assumed to be the date of birth
            const dateOfBirth: Date = dates.reduce((oldestDate, date) => {
                const
                    _date = new Date(date);
                if (_date < oldestDate)
                    return _date
                else
                    return oldestDate
            }, new Date());

            console.info(' detected date of birth: ', dateOfBirth);
            return dateOfBirth;
        }
        else
            throw new Error('No date of birth detected')
    }

    getIssuedState() {
        const
            stateName = Object.keys(stateMap).find(state => this._text.toUpperCase().match(state))

        if (!stateName)
            throw new Error(`Invalid state name: ${stateName}`);

        return stateName as USState;
    }

    // private method
    private getDOBRegex() {
        // ALL STATES ARE TEMPLATES! except:
        // Maryland
        // Pennsylvania

        // TESTED STATES:
        // Maryland
        switch (this._stateAbbreviation) {
            case "AL":
                return /\bAL\b/gi;
            case "AK":
                return /\bAK\b/gi;
            case "AZ":
                return /\bAZ\b/gi;
            case "AR":
                return /\bAR\b/gi;
            case "CA":
                return /\bCA\b/gi;
            case "CO":
                return /\bCO\b/gi;
            case "CT":
                return /\bCT\b/gi;
            case "DE":
                return /\bDE\b/gi;
            case "FL":
                return /\bFL\b/gi;
            case "GA":
                return /\bGA\b/gi;
            case "HI":
                return /\bHI\b/gi;
            case "ID":
                return /\bID\b/gi;
            case "IL":
                return /\bIL\b/gi;
            case "IN":
                return /\bIN\b/gi;
            case "IA":
                return /\bIA\b/gi;
            case "KS":
                return /\bKS\b/gi;
            case "KY":
                return /\bKY\b/gi;
            case "LA":
                return /\bLA\b/gi;
            case "MA":
                return /\bMA\b/gi;
            case "ME":
                return /\bME\b/gi;

            case "MD":
                return /\d{2}\/\d{2}\/\d{4}/gi;

            case "MI":
                return /\bMI\b/gi;
            case "MN":
                return /\bMN\b/gi;
            case "MS":
                return /\bMS\b/gi;
            case "MO":
                return /\bMO\b/gi;
            case "MT":
                return /\bMT\b/gi;
            case "NE":
                return /\bNE\b/gi;
            case "NV":
                return /\bNV\b/gi;
            case "NH":
                return /\bNH\b/gi;
            case "NJ":
                return /\bNJ\b/gi;
            case "NM":
                return /\bNM\b/gi;
            case "NY":
                return /\bNY\b/gi;
            case "NC":
                return /\bNC\b/gi;
            case "ND":
                return /\bND\b/gi;
            case "OH":
                return /\bOH\b/gi;
            case "OK":
                return /\bOK\b/gi;
            case "OR":
                return /\bOR\b/gi;

            case "PA":
                return /([DOB]+\S\s\d+)/g;

            case "RI":
                return /\bRI\b/gi;
            case "SC":
                return /\bSC\b/gi;
            case "SD":
                return /\bSD\b/gi;
            case "TN":
                return /\bTN\b/gi;
            case "TX":
                return /\bTX\b/gi;
            case "UT":
                return /\bUT\b/gi;
            case "VT":
                return /\bVT\b/gi;
            case "VA":
                return /\bVA\b/gi;
            case "WA":
                return /\bWA\b/gi;
            case "WV":
                return /\bWV\b/gi;
            case "WI":
                return /\bWI\b/gi;
            case "WY":
                return /\bWY\b/gi;
            default:
                return undefined;
        }
    }
}

//   const dobRegex = /([DOB]+\S\s\d+)/g;
//   const dobString = text.match(dobRegex).toString().split(" ")[1].split("");
//   console.info("dob string: ", dobString);
//   dobString[2] = "-";
//   dobString[5] = "-";
//   dobString.join("");
//   console.info("dob string: ", dobString);
//   return { text };
// } catch (error) {
//   return { error };


type StateMap = Record<USState, { abbreviation: StateAbbreviation; legalAge: number }>

const stateMap: StateMap = {
    "ALABAMA": { abbreviation: "AL", legalAge: 21 },
    "ALASKA": { abbreviation: "AK", legalAge: 21 },
    "ARIZONA": { abbreviation: "AZ", legalAge: 21 },
    "ARKANSAS": { abbreviation: "AR", legalAge: 21 },
    "CALIFORNIA": { abbreviation: "CA", legalAge: 21 },
    "COLORADO": { abbreviation: "CO", legalAge: 21 },
    "CONNECTICUT": { abbreviation: "CT", legalAge: 21 },
    "DELAWARE": { abbreviation: "DE", legalAge: 21 },
    "FLORIDA": { abbreviation: "FL", legalAge: 21 },
    "GEORGIA": { abbreviation: "GA", legalAge: 21 },
    "HAWAII": { abbreviation: "HI", legalAge: 21 },
    "IDAHO": { abbreviation: "ID", legalAge: 21 },
    "ILLINOIS": { abbreviation: "IL", legalAge: 21 },
    "INDIANA": { abbreviation: "IN", legalAge: 21 },
    "IOWA": { abbreviation: "IA", legalAge: 21 },
    "KANSAS": { abbreviation: "KS", legalAge: 21 },
    "KENTUCKY": { abbreviation: "KY", legalAge: 21 },
    "LOUISIANA": { abbreviation: "LA", legalAge: 21 },
    "MAINE": { abbreviation: "ME", legalAge: 21 },
    "MARYLAND": { abbreviation: "MD", legalAge: 21 },
    "MASSACHUSETTS": { abbreviation: "MA", legalAge: 21 },
    "MICHIGAN": { abbreviation: "MI", legalAge: 21 },
    "MINNESOTA": { abbreviation: "MN", legalAge: 21 },
    "MISSISSIPPI": { abbreviation: "MS", legalAge: 21 },
    "MISSOURI": { abbreviation: "MO", legalAge: 21 },
    "MONTANA": { abbreviation: "MT", legalAge: 21 },
    "NEBRASKA": { abbreviation: "NE", legalAge: 21 },
    "NEVADA": { abbreviation: "NV", legalAge: 21 },
    "NEW HAMPSHIRE": { abbreviation: "NH", legalAge: 21 },
    "NEW JERSEY": { abbreviation: "NJ", legalAge: 21 },
    "NEW MEXICO": { abbreviation: "NM", legalAge: 21 },
    "NEW YORK": { abbreviation: "NY", legalAge: 21 },
    "NORTH CAROLINA": { abbreviation: "NC", legalAge: 21 },
    "NORTH DAKOTA": { abbreviation: "ND", legalAge: 21 },
    "OHIO": { abbreviation: "OH", legalAge: 21 },
    "OKLAHOMA": { abbreviation: "OK", legalAge: 21 },
    "OREGON": { abbreviation: "OR", legalAge: 21 },
    "PENNSYLVANIA": { abbreviation: "PA", legalAge: 21 },
    "RHODE ISLAND": { abbreviation: "RI", legalAge: 21 },
    "SOUTH CAROLINA": { abbreviation: "SC", legalAge: 21 },
    "SOUTH DAKOTA": { abbreviation: "SD", legalAge: 21 },
    "TENNESSEE": { abbreviation: "TN", legalAge: 21 },
    "TEXAS": { abbreviation: "TX", legalAge: 21 },
    "UTAH": { abbreviation: "UT", legalAge: 21 },
    "VERMONT": { abbreviation: "VT", legalAge: 21 },
    "VIRGINIA": { abbreviation: "VA", legalAge: 21 },
    "WASHINGTON": { abbreviation: "WA", legalAge: 21 },
    "WEST VIRGINIA": { abbreviation: "WV", legalAge: 21 },
    "WISCONSIN": { abbreviation: "WI", legalAge: 21 },
    "WYOMING": { abbreviation: "WY", legalAge: 21 }
};

export type USState =
    'ALABAMA'
    | 'ALASKA'
    | 'ARIZONA'
    | 'ARKANSAS'
    | 'CALIFORNIA'
    | 'COLORADO'
    | 'CONNECTICUT'
    | 'DELAWARE'
    | 'FLORIDA'
    | 'GEORGIA'
    | 'HAWAII'
    | 'IDAHO'
    | 'ILLINOIS'
    | 'INDIANA'
    | 'IOWA'
    | 'KANSAS'
    | 'KENTUCKY'
    | 'LOUISIANA'
    | 'MAINE'
    | 'MARYLAND'
    | 'MASSACHUSETTS'
    | 'MICHIGAN'
    | 'MINNESOTA'
    | 'MISSISSIPPI'
    | 'MISSOURI'
    | 'MONTANA'
    | 'NEBRASKA'
    | 'NEVADA'
    | 'NEW HAMPSHIRE'
    | 'NEW JERSEY'
    | 'NEW MEXICO'
    | 'NEW YORK'
    | 'NORTH CAROLINA'
    | 'NORTH DAKOTA'
    | 'OHIO'
    | 'OKLAHOMA'
    | 'OREGON'
    | 'PENNSYLVANIA'
    | 'RHODE ISLAND'
    | 'SOUTH CAROLINA'
    | 'SOUTH DAKOTA'
    | 'TENNESSEE'
    | 'TEXAS'
    | 'UTAH'
    | 'VERMONT'
    | 'VIRGINIA'
    | 'WASHINGTON'
    | 'WEST VIRGINIA'
    | 'WISCONSIN'
    | 'WYOMING';

type StateAbbreviation = "AL" | "AK" | "AZ" | "AR" | "CA" | "CO" | "CT" | "DE" | "FL" | "GA" |
    "HI" | "ID" | "IL" | "IN" | "IA" | "KS" | "KY" | "LA" | "ME" | "MD" |
    "MA" | "MI" | "MN" | "MS" | "MO" | "MT" | "NE" | "NV" | "NH" | "NJ" |
    "NM" | "NY" | "NC" | "ND" | "OH" | "OK" | "OR" | "PA" | "RI" | "SC" |
    "SD" | "TN" | "TX" | "UT" | "VT" | "VA" | "WA" | "WV" | "WI" | "WY";