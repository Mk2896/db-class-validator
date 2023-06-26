import { ValidationArguments } from "class-validator";

export interface IsUniqueOptions {
    tableName: string,
    columnName?: string,
    valueToBeIgnored?: string | number | { (args: ValidationArguments): string | number },
    valueToBeIgnoredColumn?: string,
}