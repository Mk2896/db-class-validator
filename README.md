# db-class-validator

db-class-validator is a npm package for validating request parameters from database in `nestjs` using `class-validator` and `typeorm`

### Table of Contents  
- [Installation](#installation)
- [Usage](#usage)
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
    @Exists('TABLE_NAME_IN_DB','COLUMN_NAME_IN_DB',ValidatorOptions)  // Using Decorator
    property: string;
}
 ```

 ## Explanation

 The package uses `typeorm` `dataSource` and `queryRunner` to check if value exists in the database or not 
  ``` typescript 
    const queryRunner = this.dataSource.createQueryRunner();
    const result = await queryRunner.query(query);

    queryRunner.release();

 ```