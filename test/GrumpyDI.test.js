import { deepStrictEqual, doesNotThrow } from "assert";
import GrumpyDI from "..";
import NumberValidator from "./testObjects/Validator/NumberValidator";
import AlphaNumericValidator from "./testObjects/Validator/AlphaNumbericValidator";
import GeneralValidator from "./testObjects/Validator/GeneralValidator";

describe("GrumpyDI test", function () {
    it("Create a simple DI container", function () {
        const { container, registerObject } = GrumpyDI({ NumberValidator });

        registerObject({
            alias: "AlphaNumericValidator",
            object: AlphaNumericValidator
        });

        deepStrictEqual(container.NumberValidator, new NumberValidator);
        deepStrictEqual(container.AlphaNumericValidator, new AlphaNumericValidator);
    });

    it("Create a slightly more complicated DI container", function () {
        const { container } = GrumpyDI({
            AlphaNumericValidator,
            GeneralValidator,
            NumberValidator
        });

        deepStrictEqual(container.NumberValidator, new NumberValidator);
        deepStrictEqual(container.AlphaNumericValidator instanceof AlphaNumericValidator, true);
        deepStrictEqual(container.GeneralValidator instanceof GeneralValidator, true);
        doesNotThrow(() => { container.GeneralValidator.isValidWordOrNumberOrUnderscore(4487) });
        doesNotThrow(() => { container.GeneralValidator.isValidNumberOrUnderscore(4548) });
    });
    
    it("Create a DI with object which contains parameters passed to constructor", function () {
        const { container } = GrumpyDI({
            test: [function (a, b) {
                this.sum = () => a + b;
            }, 2, 2],
            testWithoutParams: [function () {}]
        });

        deepStrictEqual(container.test.sum(), 4);
    })
});