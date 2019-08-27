import { TestBed } from '@angular/core/testing';

import { BatchItemService } from './batch-item.service';

describe('BatchItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchItemService = TestBed.get(BatchItemService);
    expect(service).toBeTruthy();
  });
});
