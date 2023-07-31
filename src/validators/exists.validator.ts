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
            columnName,
            conditions,
        ] = args.constraints;

        if (value === undefined) {
            return false;
        }

        if (columnName === undefined) {
            columnName = args.property;
        }

        let query: string = `Select COUNT(${columnName}) as total from ${tableName} WHERE ${columnName} = '${value}'`;

        if(conditions !== undefined && conditions.length > 0) {
            conditions.forEach((condition: string) => {
                query += ` AND ${condition}`;
            });
        }

        let result: any;
        
        try {
            const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
            result = await queryRunner.query(query);

            queryRunner.release();
        } catch (error) {
            console.log(error);
            return false;
        }

        return result[0]['total'] > 0 ? true : false;
    }

    defaultMessage(args: ValidationArguments): string {
        return `${args.property} is invalid.`;
    }
}