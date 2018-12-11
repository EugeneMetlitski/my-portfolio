import { TestBed } from '@angular/core/testing';

import { ToggleSidenavService } from './toggle-sidenav.service';

describe('ToggleSidenavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToggleSidenavService = TestBed.get(ToggleSidenavService);
    expect(service).toBeTruthy();
  });
});
