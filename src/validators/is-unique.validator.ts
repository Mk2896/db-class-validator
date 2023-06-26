import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DataSource, QueryRunner } from "typeorm";

@ValidatorConstraint({ name: 'IsUnique', async: true })
@Injectable()
export class IsUniqueValidation implements ValidatorConstraintInterface {
    constructor(
        private readonly dataSource: DataSource
    ) { }

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        let [
            tableName,
            columnName,
            ignoranceValue,
            ignoranceValueColumn
        ] = args.constraints;

        if (value === undefined) {
            return false;
        }

        if (columnName === undefined) {
            columnName = args.property;
        }

        let query: string = `Select COUNT(${columnName}) as total from ${tableName} WHERE ${columnName} = "${value}"`;

        if (ignoranceValue !== undefined) {
            if (ignoranceValueColumn === undefined) {
                ignoranceValueColumn = 'id';
            }

            query += ` WHERE ${ignoranceValueColumn} <> ${ignoranceValue}`;
        }

        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        const result = await queryRunner.query(query);

        queryRunner.release();

        return result[0]['total'] < 1 ? true : false;
    }

    defaultMessage(args: ValidationArguments): string {
        return `${args.property} already exists.`;
    }
}