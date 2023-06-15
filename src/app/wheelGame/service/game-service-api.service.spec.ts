import { TestBed } from '@angular/core/testing';

import { GameServiceApi } from './game-service-api.service';

describe('GameServiceApi', () => {
  let service: GameServiceApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameServiceApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
