import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(new Date(Date.now() + 3 * 1000), { name: 'task 01' })
  handleCron() {
    console.log('log');
    this.logger.log('Task Called');
    return true;
  }
}
