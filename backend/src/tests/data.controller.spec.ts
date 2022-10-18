import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from '../controllers/data.controller';
import { DataService } from '../services/data.service';

describe('DataController', () => {
  let controller: DataController;

  const mockDataService = {
    syncDB: jest.fn(() => Promise.resolve('sync complete')),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [DataService],
    })
      .overrideProvider(DataService)
      .useValue(mockDataService)
      .compile();

    controller = module.get<DataController>(DataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('syncDB returns a string "sync complete"', async () => {
    const returnValue = await controller.syncDB();
    expect(returnValue).toEqual('sync complete');
  });
});
