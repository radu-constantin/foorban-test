import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  UpdateInfoRequest as UpdateInfoRequestInterface,
  ValidateUserRequest as ValidateUserRequestInterface,
} from './interfaces';
import { BaseResponse } from '../interfaces';
import { UpdateInfoRequest, ValidateUserRequest } from './models';

@Injectable()
export class InfoService {
  async validateInfo(
    rawData: UpdateInfoRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(UpdateInfoRequest, rawData);
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }
    return {
      success: true,
      data,
    };
  }
  async validateUser(
    rawData: ValidateUserRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(ValidateUserRequest, rawData);
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }
    return {
      success: true,
      data,
    };
  }
}
