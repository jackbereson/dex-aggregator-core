import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';
import AjvError from 'ajv-errors';

export interface IValidateSchema extends JSONSchema7 {
    errorMessage?: object | string;
}

/**
 * Kiểm tra dữ liệu JSON, không trả về lỗi.
 * @param data
 * @param schema
 */
export function validateSchema(data: any, schema: JSONSchema7) {
    const ajv = new Ajv({
        allErrors: true,
        // jsonPointers: true
        jsPropertySyntax: true,
    });

    AjvError(ajv);
    const test = ajv.compile(schema);
    const isValid = test(data);

    return {
        isValid,
        result: test,
    };
}
