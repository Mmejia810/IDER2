import { TestBed } from '@angular/core/testing';

import { ToastmService } from './toastm.service';

describe('ToastmService', () => {
  let service: ToastmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
