/* eslint-disable eqeqeq */
export class KeycodeHelper {
    /*
     * Remove Commas
     */
    static removeCommas(word: string) {
        return word.replace(/,/g, '');
    }

    /*
     * Generate alpha-numeric referral code
     */
    static alphaNumeric(type: AlphaNumbericTypes, wordlength: any, numlength: any) {
        // english alphabets
        let alphabets = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
        ];

        // english numbers
        let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        // check if wordcase is supplied
        if (type === null || type === '') {
            return 'wordcase type is required.';
        } else {
            // check for word case type
            if (type === AlphaNumbericTypes.uppercase) {
                // check for wordlength
                if (wordlength.length < 1) {
                    return 'length of alphabets to be generated is required.';
                } else {
                    // check params type
                    if (typeof wordlength !== 'number') {
                        return 'wordlength must be a number.';
                    } else {
                        // check for numlength
                        if (numlength.length > 1) {
                            return 'number of random digits to be generated is required.';
                        } else {
                            // check params type
                            if (typeof numlength !== 'number') {
                                return 'number of random digits must be a number';
                            } else {
                                // alphabets and numbers collection array
                                let picks = [];

                                // loop through alphabets array and pick an alphabet with the generated index
                                for (let i = 0; i < wordlength; i++) {
                                    let key = Math.floor(Math.random() * alphabets.length);

                                    picks.push(alphabets[key].toUpperCase());

                                    // loop through numbers array and pick a number with the generated index
                                    for (let k = 0; k < numlength; k++) {
                                        let pin = Math.floor(Math.random() * numbers.length);

                                        picks.push(numbers[pin]);
                                    }
                                }

                                // convert selected alphabets array to string and remove seperating commas
                                let letters = picks.toString();
                                let data = this.removeCommas(letters);

                                // return letters in wordcase format and numbers
                                return data;
                            }
                        }
                    }
                }
            } else {
                // check for wordlength
                if (wordlength.length < 1) {
                    return 'length of alphabets to be generated is required.';
                } else {
                    // check params type
                    if (typeof wordlength !== 'number') {
                        return 'wordlength must be a number.';
                    } else {
                        // check for numlength
                        if (numlength.length > 1) {
                            return 'number of random digits to be generated is required.';
                        } else {
                            // check params type
                            if (typeof numlength !== 'number') {
                                return 'number of random digits must be a number';
                            } else {
                                // alphabets and numbers collection array
                                let picks = [];

                                // loop through alphabets array and pick an alphabet with the generated index
                                for (let i = 0; i < wordlength; i++) {
                                    let key = Math.floor(Math.random() * alphabets.length);

                                    picks.push(alphabets[key].toLowerCase());

                                    // loop through numbers array and pick a number with the generated index
                                    for (let k = 0; k < numlength; k++) {
                                        let pin = Math.floor(Math.random() * numbers.length);

                                        picks.push(numbers[pin]);
                                    }
                                }

                                // convert selected alphabets array to string and remove seperating commas
                                let letters = picks.toString();
                                let data = this.removeCommas(letters);

                                // return letters in wordcase format and numbers
                                return data;
                            }
                        }
                    }
                }
            }
        }
    }

    /*
     * Generates alpha referral code
     * @params { type, wordlength }
     */
    static alpha(type: any, wordlength: any) {
        // english alphabets
        let alphabets = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
        ];

        // check if wordcase is supplied
        if (type === null || type === '') {
            return 'wordcase type is required.';
        } else {
            // check for word case type
            if (type === 'uppercase') {
                // check for wordlength
                if (wordlength.length < 1) {
                    return 'length of alphabets to be generated is required.';
                } else {
                    // check params type
                    if (typeof wordlength !== 'number') {
                        return 'wordlength must be a number.';
                    } else {
                        // alphabets collection array
                        let picks = [];

                        // loop through array and pick an alphabet with the generated index
                        for (let i = 0; i < wordlength; i++) {
                            let key = Math.floor(Math.random() * alphabets.length);

                            picks.push(alphabets[key]);
                        }

                        // convert selected alphabets array to string and remove seperating commas
                        let letters = picks.toString();
                        let data = this.removeCommas(letters);

                        // return letters in wordcase format
                        return data.toUpperCase();
                    }
                }
            } else {
                // check for wordlength
                if (wordlength.length < 1) {
                    return 'length of alphabets to be generated is required.';
                } else {
                    // check params type
                    if (typeof wordlength !== 'number') {
                        return 'wordlength must be a number.';
                    } else {
                        // alphabets collection array
                        let picks = [];

                        // loop through array and pick an alphabet with the generated index
                        for (let i = 0; i < wordlength; i++) {
                            let key = Math.floor(Math.random() * alphabets.length);

                            picks.push(alphabets[key]);
                        }

                        // convert selected alphabets array to string and remove seperating commas
                        let letters = picks.toString();
                        let data = this.removeCommas(letters);

                        // return letters in wordcase format
                        return data.toLowerCase();
                    }
                }
            }
        }
    }

    /*
     * Generate custom referral code
     * @params { secret, wordlength, numlength, type }
     */
    static custom(type: any, wordlength: any, numlength: any, secret: any) {
        // check for the secret length
        if (secret.length > 1) {
            // check for word length
            if (typeof wordlength !== 'number') {
                return 'word length to chunk must be a number';
            } else {
                // check if secret length is greater than word length
                if (secret.length > wordlength) {
                    // extract code word
                    let chunked_name = secret.slice(0, wordlength);

                    // check for wordcase
                    if (type !== null) {
                        // check wordcase type
                        if (type === 'uppercase') {
                            // check for random number length
                            if (numlength > 1) {
                                // generate random number
                                // Math.floor(100000 + Math.random() * 900000)
                                let code = Math.floor(
                                    Math.pow(10, numlength - 1) +
                                        Math.random() * 9 * Math.pow(10, numlength - 1),
                                );

                                // referral code
                                return chunked_name.toUpperCase() + '' + code;
                            } else {
                                return 'random number length is required.';
                            }
                        } else if (type === 'lowercase') {
                            // check for random number length
                            if (numlength > 1) {
                                // generate random number
                                let code = Math.floor(
                                    Math.pow(10, numlength - 1) +
                                        Math.random() * 9 * Math.pow(10, numlength - 1),
                                );

                                // referral code
                                return chunked_name.toLowerCase() + '' + code;
                            } else {
                                return 'random number length is required.';
                            }
                        } else {
                            // check for random number length
                            if (numlength > 1) {
                                // generate random number
                                let code = Math.floor(
                                    Math.pow(10, numlength - 1) +
                                        Math.random() * 9 * Math.pow(10, numlength - 1),
                                );

                                // referral code
                                return chunked_name + '' + code;
                            } else {
                                return 'random number length is required.';
                            }
                        }
                    } else {
                        // generate random number
                        let code = Math.floor(100000 + Math.random() * 900000);

                        // referral code
                        return chunked_name + '' + code;
                    }
                } else {
                    return "secret's length should be greater than word length.";
                }
            }
        } else {
            return 'secret is required.';
        }
    }
}

export enum AlphaNumbericTypes {
    uppercase = 'uppercase',
    '' = '',
}
