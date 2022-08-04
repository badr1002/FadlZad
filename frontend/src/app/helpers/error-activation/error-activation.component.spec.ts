import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorActivationComponent } from './error-activation.component';

describe('ErrorActivationComponent', () => {
  let component: ErrorActivationComponent;
  let fixture: ComponentFixture<ErrorActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorActivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
