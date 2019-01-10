import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnUpDownComponent } from './header-button.component';

describe('HeaderButtonComponent', () => {
  let component: BtnUpDownComponent;
  let fixture: ComponentFixture<BtnUpDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnUpDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnUpDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
