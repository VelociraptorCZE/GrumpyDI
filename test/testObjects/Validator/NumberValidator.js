export default class NumberValidator {
    isValidNumber (value) {
        return /\d/g.test(value);
    }
}