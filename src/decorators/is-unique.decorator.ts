import { registerDecorator, ValidationOptions } from "class-validator";
import { IsUniqueValidation } from "../validators";
import { IsUniqueOptions } from "../interface";

export function IsUnique(isUniqueOptions: IsUniqueOptions, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [
                isUniqueOptions.tableName,
                isUniqueOptions.columnName,
                isUniqueOptions.valueToBeIgnored,
                isUniqueOptions.valueToBeIgnoredColumn,
            ],
            options: validationOptions,
            validator: IsUniqueValidation
        });
    };
}