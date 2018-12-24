import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTrackerComponent } from './money-tracker.component';

describe('MoneyTrackerComponent', () => {
  let component: MoneyTrackerComponent;
  let fixture: ComponentFixture<MoneyTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
