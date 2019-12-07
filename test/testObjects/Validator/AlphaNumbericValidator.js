export default class AlphaNumericValidator {
    onInit ({ NumberValidator }) {
        this.validator = NumberValidator;
    }

    isValidNumberOrWord (value) {
        return this.validator.isValidNumber(value) || /[a-zA-Z]/g.test(value);
    }
}