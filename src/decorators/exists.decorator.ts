import { registerDecorator, ValidationOptions } from "class-validator";
import { ExistsValidation } from "../validators/exists.validator";

export function Exists(tableName: string , columnName: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [tableName ,columnName],
            options: validationOptions,
            validator: ExistsValidation
        });
    };
}