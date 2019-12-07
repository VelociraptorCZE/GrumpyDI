export default class GeneralValidator {
    onInit ({ AlphaNumericValidator, NumberValidator }) {
        this.alphaNumericValidator = AlphaNumericValidator;
        this.numberValidator = NumberValidator;

        this.isValidNumberOrUnderscore(134);
    }

    isUnderscore (value) {
        return /_/g.test(value);
    }

    isValidWordOrNumberOrUnderscore (value) {
        return this.alphaNumericValidator.isValidNumberOrWord(value) || this.isUnderscore(value);
    }

    isValidNumberOrUnderscore (value) {
        return this.numberValidator.isValidNumber(value) || this.isUnderscore(value);
    }
}