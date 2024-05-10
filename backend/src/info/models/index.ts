import {
  UpdateInfoRequest as UpdateInfoRequestInterface,
  ValidateUserRequest as ValidateUserRequestInterface,
} from '../interfaces';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  ValidateIf,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class UpdateInfoRequest implements UpdateInfoRequestInterface {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}

export class ValidateUserRequest implements ValidateUserRequestInterface {
  @IsNotEmpty({
    message: 'You must enter a name!',
  })
  @IsString()
  @MinLength(5, {
    message: 'The name must contain at least 5 characters!',
  })
  @MaxLength(50, {
    message: 'The name must contain a less than 50 characters!',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateIf((user) => user.age >= 18)
  @IsNotEmpty()
  @IsBoolean()
  married: boolean;

  @IsNotEmpty()
  @IsDateString()
  dob: Date;
}
