import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DataSource, QueryRunner } from "typeorm";

@ValidatorConstraint({ name: 'Exists', async: true })
@Injectable()
export class ExistsValidation implements ValidatorConstraintInterface {
    constructor(
        private readonly dataSource: DataSource
    ) { }

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        let [
            tableName,
            columnName
        ] = args.constraints;

        if (value === undefined) {
            return false;
        }
        
        if(columnName === undefined) {
            columnName = args.property;
        }

        const query: string = `Select COUNT(${columnName}) as total from ${tableName} WHERE ${columnName} = '${value}'`;

        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        const result = await queryRunner.query(query);

        queryRunner.release();

        return result[0]['total'] > 0 ? true : false;
    }

    defaultMessage(args: ValidationArguments): string {
        return `${args.property} is invalid.`;
    }
}