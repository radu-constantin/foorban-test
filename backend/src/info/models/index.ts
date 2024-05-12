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
import { dobMatchesAge } from '../../helpers/customDecorators';

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
  @IsString({
    message: 'The name must be a string of characters',
  })
  @MinLength(5, {
    message: 'The name must contain at least 5 characters!',
  })
  @MaxLength(50, {
    message: 'The name must contain a less than 50 characters!',
  })
  name: string;

  @IsNotEmpty({
    message: 'You must enter an age!',
  })
  @IsNumber()
  age: number;

  @ValidateIf((user) => user.age >= 18)
  @IsNotEmpty({
    message:
      "The 'married' field is mandatory for persons that are over 18 years of age!",
  })
  @IsBoolean()
  married: boolean;

  @IsNotEmpty({
    message: 'You must enter a date of birth!',
  })
  @IsDateString()
  @dobMatchesAge('age', {
    message: 'The date of birth does not match the age!',
  })
  dob: Date;
}
