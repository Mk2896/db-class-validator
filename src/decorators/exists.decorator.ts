import { registerDecorator, ValidationOptions } from "class-validator";
import { ExistsValidation } from "../validators";
import { ExistsOptions } from "../interface";

export function Exists(existsOptions: ExistsOptions, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [
                existsOptions.tableName,
                existsOptions.columnName
            ],
            options: validationOptions,
            validator: ExistsValidation
        });
    };
}