import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoRequest, ValidateUserRequest } from './interfaces';
import { BaseResponse } from '../interfaces';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post('/validate')
  getConfig(@Body() bodyRequest: UpdateInfoRequest): Promise<BaseResponse> {
    return this.infoService.validateInfo(bodyRequest);
  }

  @Post('/validateUser')
  async validateUser(
    @Body() bodyRequest: ValidateUserRequest,
  ): Promise<BaseResponse> {
    return this.infoService.validateUser(bodyRequest);
  }
}
