import { GrantsService } from './grants.service'
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Delete,
  Post,
  Body,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { GrantType } from '../grant-types/grant-type.model'
import { Grant } from './grants.model'

@ApiTags('grants')
@Controller('grants')
export class GrantsController {
  constructor(private readonly grantsService: GrantsService) {}

  @Get(':subjectId')
  @ApiOkResponse({ type: GrantType })
  async getAll(@Param('subjectId') subjectId: string): Promise<Grant[]> {
    const grants = await this.grantsService.getAllAsync(subjectId)

    if (!grants) {
      throw new NotFoundException('Nothing found')
    }

    return grants
  }

  @Get(':key')
  @ApiOkResponse({ type: GrantType })
  async getAsync(@Param('key') key: string): Promise<Grant> {
    const grants = await this.grantsService.getAsync(key)

    if (!grants) {
      throw new NotFoundException("This particular grant doesn't exist")
    }

    return grants
  }

  @Delete(':subjectId/:clientId')
  @ApiOkResponse()
  async removeAllAsync(
    @Param('subjectId') subjectId: string,
    @Param('clientId') clientId: string,
  ): Promise<number> {
    return await this.grantsService.removeAllAsync(subjectId, clientId)
  }

  @Delete(':subjectId/:clientId/:type')
  @ApiOkResponse()
  async removeAllAsyncV2(
    @Param('subjectId') subjectId: string,
    @Param('clientId') clientId: string,
    @Param('type') type: string,
  ): Promise<number> {
    return await this.grantsService.removeAllAsync(subjectId, clientId)
  }

  @Delete(':key')
  @ApiOkResponse()
  async removeAsync(
    @Param('key') key: string,
  ): Promise<number> {
    return await this.grantsService.removeAsync(key)
  }

  @Post()
  @ApiOkResponse({ type: Grant })
  async store(@Body() grant: Grant): Promise<Grant> {
    return await this.grantsService.storeAsync(grant)
  }
}