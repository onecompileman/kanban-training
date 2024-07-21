import { TestBed } from '@angular/core/testing';

import { BoardListResolver } from './board-list.resolver';

describe('BoardListResolver', () => {
  let resolver: BoardListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BoardListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
