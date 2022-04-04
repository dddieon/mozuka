import { Body, Controller, Post } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('api/results')
export class ResultsController {
  constructor(private resultService: ResultsService) {}

  @Post()
  async createResult(@Body() body) {
    return await this.resultService.createResult(body);
  }
}
