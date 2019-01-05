import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutAppComponent } from './workout-app.component';

describe('WorkoutAppComponent', () => {
  let component: WorkoutAppComponent;
  let fixture: ComponentFixture<WorkoutAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
