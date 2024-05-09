import { UpdateInfoRequest as UpdateInfoRequestInterface } from '../interfaces';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateInfoRequest implements UpdateInfoRequestInterface {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
