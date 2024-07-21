import { TestBed } from '@angular/core/testing';

import { BoardInfoResolver } from './board-info.resolver';

describe('BoardInfoResolver', () => {
  let resolver: BoardInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BoardInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
