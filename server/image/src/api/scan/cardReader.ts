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
    
    constructor(text: string) {
        this._text = text;
        this._stateName = this.getIssuedState();
        this._stateAbbreviation = stateMap[this._stateName].abbreviation;
    }

    isLegalAge() {
        const _dob = this.getDateOfBirth()
        console.log('date of birth: ', _dob)
        const isLegalAge = this.checkLegalAge(_dob)
        return isLegalAge;
    }

    private checkLegalAge(dateOfBirth: Date): boolean {
        const now = new Date();
        const diff = now.getTime() - dateOfBirth.getTime();
        const years = diff / (1000 * 60 * 60 * 24 * 365.25);
        console.log('years', years)

        const stateLegalAge = stateMap[this._stateName].legalAge;
        console.log('stateLegalAge', stateLegalAge)

        return years >= stateLegalAge;
    }
    
    private getDateOfBirth(): Date {
        const dobFieldRegex = this.getDOBRegex();
        console.log('dobFieldRegex', dobFieldRegex)
        
        const dobString = this._text.match(dobFieldRegex);
        console.log('dobString', dobString)
        if (dobString) {
            const _date = new Date(dobString[0]);
            return _date;
        }
        else throw new Error('No date of birth found in text')
    }
    
    private getIssuedState() {
        console.log('text', this._text)
        const stateName = Object.keys(stateMap).find((state) => {
            if (this._text.match(state)) {
                console.log('state found', state)
                return state;
            }
        })
        if (!stateName) {
            throw new Error(`Invalid state name: ${stateName}`);
        }
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
                return /\bAL\b/i;
            case "AK":
                return /\bAK\b/i;
            case "AZ":
                return /\bAZ\b/i;
            case "AR":
                return /\bAR\b/i;
            case "CA":
                return /\bCA\b/i;
            case "CO":
                return /\bCO\b/i;
            case "CT":
                return /\bCT\b/i;
            case "DE":
                return /\bDE\b/i;
            case "FL":
                return /\bFL\b/i;
            case "GA":
                return /\bGA\b/i;
            case "HI":
                return /\bHI\b/i;
            case "ID":
                return /\bID\b/i;
            case "IL":
                return /\bIL\b/i;
            case "IN":
                return /\bIN\b/i;
            case "IA":
                return /\bIA\b/i;
            case "KS":
                return /\bKS\b/i;
            case "KY":
                return /\bKY\b/i;
            case "LA":
                return /\bLA\b/i;
            case "ME":
                return /\bME\b/i;

            case "MD":
                return /\bMD\b/i;

            case "MA":
                return /\bMA\b/i;
            case "MI":
                return /\bMI\b/i;
            case "MN":
                return /\bMN\b/i;
            case "MS":
                return /\bMS\b/i;
            case "MO":
                return /\bMO\b/i;
            case "MT":
                return /\bMT\b/i;
            case "NE":
                return /\bNE\b/i;
            case "NV":
                return /\bNV\b/i;
            case "NH":
                return /\bNH\b/i;
            case "NJ":
                return /\bNJ\b/i;
            case "NM":
                return /\bNM\b/i;
            case "NY":
                return /\bNY\b/i;
            case "NC":
                return /\bNC\b/i;
            case "ND":
                return /\bND\b/i;
            case "OH":
                return /\bOH\b/i;
            case "OK":
                return /\bOK\b/i;
            case "OR":
                return /\bOR\b/i;

            case "PA":
                return /([DOB]+\S\s\d+)/g;

            case "RI":
                return /\bRI\b/i;
            case "SC":
                return /\bSC\b/i;
            case "SD":
                return /\bSD\b/i;
            case "TN":
                return /\bTN\b/i;
            case "TX":
                return /\bTX\b/i;
            case "UT":
                return /\bUT\b/i;
            case "VT":
                return /\bVT\b/i;
            case "VA":
                return /\bVA\b/i;
            case "WA":
                return /\bWA\b/i;
            case "WV":
                return /\bWV\b/i;
            case "WI":
                return /\bWI\b/i;
            case "WY":
                return /\bWY\b/i;
            default:
                return undefined;
        }
    }
}

    //   const dobRegex = /([DOB]+\S\s\d+)/g;
    //   const dobString = text.match(dobRegex).toString().split(" ")[1].split("");
    //   console.log("dob string: ", dobString);
    //   dobString[2] = "-";
    //   dobString[5] = "-";
    //   dobString.join("");
    //   console.log("dob string: ", dobString);
    //   return { text };
    // } catch (error) {
    //   return { error };


type StateMap = Record<USState, { abbreviation: StateAbbreviation; legalAge: number}>

const stateMap: StateMap = {
    "Alabama": { 
        abbreviation: "AL", 
        legalAge: 21 
    },
    "Alaska": { abbreviation: "AK", legalAge: 21 },
    "Arizona": { abbreviation: "AZ", legalAge: 21 },
    "Arkansas": { abbreviation: "AR", legalAge: 21 },
    "California": { abbreviation: "CA", legalAge: 21 },
    "Colorado": { abbreviation: "CO", legalAge: 21 },
    "Connecticut": { abbreviation: "CT", legalAge: 21 },
    "Delaware": { abbreviation: "DE", legalAge: 21 },
    "Florida": { abbreviation: "FL", legalAge: 21 },
    "Georgia": { abbreviation: "GA", legalAge: 21 },
    "Hawaii": { abbreviation: "HI", legalAge: 21 },
    "Idaho": { abbreviation: "ID", legalAge: 21 },
    "Illinois": { abbreviation: "IL", legalAge: 21 },
    "Indiana": { abbreviation: "IN", legalAge: 21 },
    "Iowa": { abbreviation: "IA", legalAge: 21 },
    "Kansas": { abbreviation: "KS", legalAge: 21 },
    "Kentucky": { abbreviation: "KY", legalAge: 21 },
    "Louisiana": { abbreviation: "LA", legalAge: 21 },
    "Maine": { abbreviation: "ME", legalAge: 21 },
    "Maryland": { abbreviation: "MD", legalAge: 21 },
    "Massachusetts": { abbreviation: "MA", legalAge: 21 },
    "Michigan": { abbreviation: "MI", legalAge: 21 },
    "Minnesota": { abbreviation: "MN", legalAge: 21 },
    "Mississippi": { abbreviation: "MS", legalAge: 21 },
    "Missouri": { abbreviation: "MO", legalAge: 21 },
    "Montana": { abbreviation: "MT", legalAge: 21 },
    "Nebraska": { abbreviation: "NE", legalAge: 21 },
    "Nevada": { abbreviation: "NV", legalAge: 21 },
    "New Hampshire": { abbreviation: "NH", legalAge: 21 },
    "New Jersey": { abbreviation: "NJ", legalAge: 21 },
    "New Mexico": { abbreviation: "NM", legalAge: 21 },
    "New York": { abbreviation: "NY", legalAge: 21 },
    "North Carolina": { abbreviation: "NC", legalAge: 21 },
    "North Dakota": { abbreviation: "ND", legalAge: 21 },
    "Ohio": { abbreviation: "OH", legalAge: 21 },
    "Oklahoma": { abbreviation: "OK", legalAge: 21 },
    "Oregon": { abbreviation: "OR", legalAge: 21 },
    "Pennsylvania": { abbreviation: "PA", legalAge: 21 },
    "Rhode Island": { abbreviation: "RI", legalAge: 21 },
    "South Carolina": { abbreviation: "SC", legalAge: 21 },
    "South Dakota": { abbreviation: "SD", legalAge: 21 },
    "Tennessee": { abbreviation: "TN", legalAge: 21 },
    "Texas": { abbreviation: "TX", legalAge: 21 },
    "Utah": { abbreviation: "UT", legalAge: 21 },
    "Vermont": { abbreviation: "VT", legalAge: 21 },
    "Virginia": { abbreviation: "VA", legalAge: 21 },
    "Washington": { abbreviation: "WA", legalAge: 21 },
    "West Virginia": { abbreviation: "WV", legalAge: 21 },
    "Wisconsin": { abbreviation: "WI", legalAge: 21 },
    "Wyoming": { abbreviation: "WY", legalAge: 21 }
};  

type USState =
'Alabama'
| 'Alaska'
| 'Arizona'
| 'Arkansas'
| 'California'
| 'Colorado'
| 'Connecticut'
| 'Delaware'
| 'Florida'
| 'Georgia'
| 'Hawaii'
| 'Idaho'
| 'Illinois'
| 'Indiana'
| 'Iowa'
| 'Kansas'
| 'Kentucky'
| 'Louisiana'
| 'Maine'
| 'Maryland'
| 'Massachusetts'
| 'Michigan'
| 'Minnesota'
| 'Mississippi'
| 'Missouri'
| 'Montana'
| 'Nebraska'
| 'Nevada'
| 'New Hampshire'
| 'New Jersey'
| 'New Mexico'
| 'New York'
| 'North Carolina'
| 'North Dakota'
| 'Ohio'
| 'Oklahoma'
| 'Oregon'
| 'Pennsylvania'
| 'Rhode Island'
| 'South Carolina'
| 'South Dakota'
| 'Tennessee'
| 'Texas'
| 'Utah'
| 'Vermont'
| 'Virginia'
| 'Washington'
| 'West Virginia'
| 'Wisconsin'
| 'Wyoming';

type StateAbbreviation = "AL" | "AK" | "AZ" | "AR" | "CA" | "CO" | "CT" | "DE" | "FL" | "GA" |
"HI" | "ID" | "IL" | "IN" | "IA" | "KS" | "KY" | "LA" | "ME" | "MD" |
"MA" | "MI" | "MN" | "MS" | "MO" | "MT" | "NE" | "NV" | "NH" | "NJ" |
"NM" | "NY" | "NC" | "ND" | "OH" | "OK" | "OR" | "PA" | "RI" | "SC" |
"SD" | "TN" | "TX" | "UT" | "VT" | "VA" | "WA" | "WV" | "WI" | "WY";