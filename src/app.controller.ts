import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { DbService } from './db/db.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dbService: DbService
  ) {}
}
