import { Test, TestingModule } from '@nestjs/testing';
import { GiftsService } from './gifts.service';

describe('GiftsService', () => {
  let service: GiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiftsService],
    }).compile();

    service = module.get<GiftsService>(GiftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
