# db-class-validator

db-class-validator is a npm package for validating request parameters from database in `nestjs` using `class-validator` and `typeorm`

### Table of Contents  
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
    - [Exists](#exists)
    - [IsUnique](#unique)
- [Explanation](#explanation)

## Installation

To install it, using npm:

```shell
npm install db-class-validator
```
## Usage

1. To use this you first have to add following line in your `main.ts` file.

``` typescript
 useContainer(app.select(AppModule), { fallbackOnErrors: true });
 ```

 `useContainer` is imported from `class-validator` it is used so that the validation function uses `AppModule` as the root module for dependency resolution.

2. Add **`ExistsValidation`** class in your `AppModule` providers
 
``` typescript
import { Module } from '@nestjs/common';
import { ExistsValidation } from 'db-class-validator'; // Importing Validator Class

@Module({
  imports: [],
  controllers: [],
  providers: [
    ExistsValidation,  // Add This Here
  ],
})
export class AppModule { }
 ```

 3. Use the decorator on the property you want to validate in the `Dto`
 ``` typescript 
import { Exists } from 'db-class-validator'; // Importing Decorator

export class YourDto { 
    @Exists(existsOptions,ValidatorOptions)  // Using Decorator
    property: string;
}
 ```

 ## Features
 
 The library has following decorators to validate your request data:

 ### Exists

 This decorator checks if the field under validation exists in the database and will throw error if it is not.

  ``` typescript 
import { Exists } from 'db-class-validator'; // Importing Decorator

export class YourDto { 
    @Exists(
        {
            tableName: 'TABLE_NAME_IN_DATABASE',
            columnName?: 'COLUMN_NAME_IN_DATABASE'   // Column name is optional if it is not provided it will consider property name as column name
        },
        ValidatorOptions?
    )  // Using Decorator
    property: string;
}
 ```

 This valdiation decorator uses `ExistsValdiation` Class for validation, which need to be imported in `AppModule`

 ``` typescript
import { Module } from '@nestjs/common';
import { ExistsValidation } from 'db-class-validator'; // Importing Validator Class

@Module({
  imports: [],
  controllers: [],
  providers: [
    ExistsValidation,  // Add This Here
  ],
})
export class AppModule { }
 ```

 ### IsUnique

 This decorator checks if the field under validation is unique and do not exists in the database.


  ``` typescript 
import { IsUnique } from 'db-class-validator'; // Importing Decorator

export class YourDto { 
    @IsUnique(
        {
            tableName: 'TABLE_NAME_IN_DATABASE',
            columnName?: 'COLUMN_NAME_IN_DATABASE'   // Column name is optional if it is not provided it will consider property name as column name
        },
        ValidatorOptions?
    )  // Using Decorator
    property: string;
}
 ```
 It can also be used to check if field under validation is unique but not against certain row, which is useful when validating during update operations

  ``` typescript 
export class YourDto { 
    @IsUnique(
        {
            tableName: 'TABLE_NAME_IN_DATABASE',
            columnName?: 'COLUMN_NAME_IN_DATABASE',   // Column name is optional if it is not provided it will consider property name as column name
            valueToBeIgnored: VALUE_TO_BE_IGNORED, // It takes string | number | (ValidationArguments) => string | number
            valueToBeIgnoredColumn: 'COLUMN_NAME_TO_BE_IGNORED_IN_DATABASE'  // If `valueToBeIgnoredColumn` is not provided it checks in `id` column
        },
        ValidatorOptions?
    )  // Using Decorator
    property: string;
}
 ```
 This valdiation decorator uses `IsUniqueValdiation` Class for validation, which need to be imported in `AppModule`

 ``` typescript
import { Module } from '@nestjs/common';
import { IsUniqueValidation } from 'db-class-validator'; // Importing Validator Class

@Module({
  imports: [],
  controllers: [],
  providers: [
    IsUniqueValidation,  // Add This Here
  ],
})
export class AppModule { }
 ```

 ## Explanation

 The package uses `typeorm` `dataSource` and `queryRunner` to check if value exists in the database or not 
  ``` typescript 
    const queryRunner = this.dataSource.createQueryRunner();
    const result = await queryRunner.query(query);

    queryRunner.release();

 ```