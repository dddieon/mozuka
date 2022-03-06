import { Body, Controller, Post } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('api/results')
export class ResultsController {
  constructor(private resultService: ResultsService) {}

  @Post()
  async createData(@Body() body) {
    await this.resultService.createResult(body);
    return;
  }

  // @Post()
  // async createResult(@Body() body) {
  //   await this.resultService.createResult(body);
  //   return;
  // }
}
