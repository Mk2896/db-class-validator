import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DataSource } from "typeorm";

@ValidatorConstraint({ name: 'Exists', async: true })
@Injectable()
export class ExistsValidation implements ValidatorConstraintInterface {
    constructor(
        private readonly connection: DataSource
    ) { }

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        const [tableName, columnName] = args.constraints;
        if (value === undefined) {
            return false;
        }

        const query: string = `Select COUNT(${columnName}) as total from ${tableName} WHERE ${columnName} = "${value}"`;

        const queryRunner = this.connection.createQueryRunner();
        const result = await queryRunner.query(query);

        queryRunner.release();

        return result[0]['total'] > 0 ? true : false;
    }
}